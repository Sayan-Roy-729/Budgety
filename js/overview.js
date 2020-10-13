document.getElementById('logout').addEventListener('click', function () {

    firebase.auth().signOut().then(function () {
        localStorage.removeItem("name");
        localStorage.removeItem("userId");
        localStorage.removeItem("picture");
        window.location.href = 'login.html'
    })
})
document.getElementById('dashboard').addEventListener('click', function () {

    window.location.href = "index.html";
})

// *************************************************************************************
let user_id = localStorage.getItem('userId');
let ref = firebase.database().ref('/users/' + user_id);
let expenseCategories = [];
let incomeCategories = [];
let expenseValues = [];
let myLabels = [];


firebase.database().ref('users/' + user_id).on('value', function (snapshot) {
    let data = snapshot.val();

    let totalExpense = document.querySelector('#debit');
    let totalIncome = document.querySelector('#credit');


    let income = 0;
    let expense = 0;

    for (let id in data) {
        let temp = data[id].category;
        if (expenseCategories.includes(temp)) {
            //pass
        } else {
            if (data[id].type !== 'credit') {
                expenseCategories.push(temp);
            } else {
                incomeCategories.push(temp)
            }
        }

        if (data[id].type === 'credit') {
            income += Number(data[id].amount);
        } else {
            expense += Number(data[id].amount);
        }

    };
    totalExpense.textContent = expense;
    totalIncome.textContent = income;



    expenseCategories.forEach(element => {
        let amount = 0;

        for (let id in data) {
            if (data[id].category === element) {
                amount += Number(data[id].amount);
            }
        };

        expenseValues.push(amount);


    });
})
// ***********************************************************************************
ref.on('value', function (snapshot) {
    let data = snapshot.val();

    let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let expAmount = [0, 0, 0, 0, 0, 0, 0]
    let credAmount = [0, 0, 0, 0, 0, 0, 0]


    for (let id in data) {

        let parts = data[id].date.split('-');
        let expenseDate = new Date(parts[0], parts[1] - 1, parts[2]);
        let expenseDay = expenseDate.getDay()
        console.log(expenseDay);

        if (data[id].type === 'credit') {

            let index = expenseDay;
            credAmount[index] += Number(data[id].amount);
        }
        else {
            let index = expenseDay;
            expAmount[index] += Number(data[id].amount)
        }
    }

    let barchart = document.querySelector('#bar_graph').getContext('2d');

    let bar_Chart = new Chart(barchart, {
        type: 'bar',
        data: {
            labels: day,
            datasets: [{
                label: 'Day wise Expense',
                data: expAmount,
                backgroundColor: '#007991'
            }, {
                label: 'Day wise Income',
                data: credAmount,
                backgroundColor: '#FFE000'
            }]
        }
    })

})
// _______Line Chart_____________

ref.on('value', function (snapshot) {

    let data = snapshot.val();

    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let expAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let credAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
 

    for (let id in data) {

        let parts = data[id].date.split('-');
        let expenseDate = new Date(parts[0], parts[1] - 1, parts[2]);
        let expenseMonth = expenseDate.getMonth()

        if (data[id].type === 'credit') {

            let index = expenseMonth - 1;
            credAmount[index] += Number(data[id].amount);
        }
        else {
            let index = expenseMonth - 1;
            expAmount[index] += Number(data[id].amount)
        }
    }


    let lineChart = document.querySelector('#line_chart').getContext('2d');

    let line_Chart = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: month,
            datasets: [{
                label: 'Month wise Expense',
                data: expAmount,
                backgroundColor:'#0f9b0f'
            }, {
                label: 'Month wise Income',
                data: credAmount,
                backgroundColor: '#8E54E9'
            }]
        }
    })

})
// **************************************************
ref.on('value', function (snapshot) {

    let data = snapshot.val();

    let credCategoryList = [];
    let credAmount = [];
    let expCategoryList = [];
    let expAmount = [];


    for (let id in data) {


        if (data[id].type === 'credit') {

            if (credCategoryList.includes(data[id].category)) {

                let index = credCategoryList.indexOf(data[id].category);
                credAmount[index] += Number(data[id].amount);

            } else {
                credCategoryList.push(data[id].category);
                credAmount.push(Number(data[id].amount));
            }
        }

        else {
            if (expCategoryList.includes(data[id].category)) {

                let index = expCategoryList.indexOf(data[id].category);
                expAmount[index] += Number(data[id].amount);

            } else {
                expCategoryList.push(data[id].category);
                expAmount.push(Number(data[id].amount));
            }
        }

    }

    let PieChart = document.querySelector('#pie_chart').getContext('2d');

    let pie_chart = new Chart(PieChart, {
        type: 'pie',
        data: {
            labels: credCategoryList,
            datasets: [{
                label: 'Credit',
                data: credAmount,
                backgroundColor: ['#800080', '#CB356B', '#007991', '#0f9b0f', '#8E0E00', '#8E54E9', '#FFE000']
                , label: 'Debit',
                data: expAmount,
                backgroundColor: ['#800080', '#CB356B', '#007991', '#0f9b0f', '#8E0E00', '#8E54E9', '#FFE000']

            }]
        }
    })
})
