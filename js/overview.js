document.getElementById('logout').addEventListener('click', function () {

    firebase.auth().signOut().then(function () {
        localStorage.removeItem("name");
        localStorage.removeItem("userId");
        localStorage.removeItem("picture");
        window.location.href = 'login.html'
    })
})
document.getElementById('dashboard').addEventListener('click', function () {
//   window.location.href="dashboard.html"
window.location.href = "index.html";
})




let user_id = localStorage.getItem('userId');

let expenseCategories = [];
let incomeCategories = [];

let expenseValues = [];
let myLabels = [];


firebase.database().ref('users/' + user_id).on('value', function (snapshot){
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

// -------------------------------------------------------------------------------

// -------------------------------------------------------------------------------

// -------------------------------------------------------------------------------
let mychart = document.getElementById("bar_graph").getContext('2d');
let piechart = document.getElementById("pie_chart").getContext('2d');
let linechart = document.getElementById("line_chart").getContext('2d');
let expense_chart = new Chart(mychart, {
    type: 'bar',
    data: {
        labels: expenseCategories,
        datasets: [{
            label: ['category wise expense'],
            backgroundColor: ['#0575E6'],
            data: expenseValues,
            backgroundColor: ['#800080', '#CB356B', '#007991', '#0f9b0f', '#8E0E00', '#8E54E9', '#FFE000']
        }]

    }

})
let credit_chart = new Chart(piechart, {
    type: 'pie',
    data: {
        labels: expenseCategories,
        datasets: [{
            label: 'Category Wise Expense',
            data:['income','expense'],
            backgroundColor: ['#0575E6', '#f12711']
        }]

    }

})
let line_chart = new Chart(linechart, {
    type: 'line',
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Expense in a day',
            data: [40000, 3000, 3000, 6890, 900, 900, 5000],
            backgroundColor:['#CB356B']
        }]

    }

})

// 
function updateChartType() {
    // Since you can't update chart type directly in Charts JS you must destroy original chart and rebuild
    expenseChart.destroy();

};



