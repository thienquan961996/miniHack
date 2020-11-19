$('#createGameForm').on('submit', (event) =>{
    event.preventDefault();

    const player1 = $('#player1').val();
    const player2 = $('#player2').val();
    const player3 = $('#player3').val();
    const player4 = $('#player4').val();

    const players = [
        player1,
        player2,
        player3,
        player4
    ]

    $.ajax({
        url: '/api/games',
        type: 'POST',
        data: {
            players
        },
    })
    .then(res =>{
        if( res.success) {
            window.location.href = `/game/${res.data._id}`
        }
    })
})
