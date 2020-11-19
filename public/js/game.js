const idGame = window.location.pathname.split('/').pop();

let globalScores = [0,0,0,0];
const changeScore = function(event) {
    const $el = $(event.target)
    const value = $el.val();
    const row = $el.data('row');
    const col = $el.data('col')

    globalScores[row][col] = val;

    for( let i=0; i< globalScores.length; i++){
        sumCol += globalScores[i][col];
    }

    $(`#gameResult thead th`)

}
$.ajax({
    url: `/api/games/${idGame}`,
    type: 'GET'
})
    .then(res => {
        if (res.success) {
            const game = res.data;
            console.log(res.data)
            const { players, scores } = game;
        $('#gameResult thead').append(
        `
        <th scope="col">#</th>
        <th scope="col">${players[0]}</th>
        <th scope="col">${players[1]}</th>
        <th scope="col">${players[2]}</th>
        <th scope="col">${players[3]}</th>
        `
        );
        let sumCol = [0,0,0,0]
        let sumRow = [];
        for( let i =0; i< scores.length; i++){
            const round = scores[i];

            for (let j= 0; j< round.length; j++){
                sumCol[j] += round[j]
                sumRow[i] = sumRow[j] ? sumRow[i] + round[j] : round[j] 
            }
        }

        $('#gameResult tbody').append(
         `
            <th scope="col">Total</th>
            <th scope="col">${sumCol[0]}</th>
            <th scope="col">${sumCol[1]}</th>
            <th scope="col">${sumCol[2]}</th>
            <th scope="col">${sumCol[3]}</th>
        `
        );
        const scoreHTML = scores.map((round, idx)=>{
            return `
            <tr>
            <td>Round${idx + 1} ${sumRow[idx]}</td>
            
            <td>${round[0]}
            <input 
            type="number" 
            value="${round[0]}" 
            oninput="changeScore(event)"></td>
            
            <td>${round[1]}
            <input 
            type="number" 
            value="${round[1]}"></td>
            
            <td>${round[2]}
            <input 
            type="number" 
            value="${round[2]}"></td>
            
            <td>${round[3]}
            <input 
            type="number" 
            value="${round[3]}"></td>
            
            </tr>
            
            `
        }).join('')
        $('#gameResult tbody').append(scoreHTML);


        } else {
            alert('server error')
        }
    })