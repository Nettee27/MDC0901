function sumPositiveNumbers(numbers) {
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0) {
            sum = sum + numbers[i];
        }
    }

    return sum;
}

function showSum() {
    const input = document.getElementById("numbers").value;
    const numbers = input.split(",").map(Number);
    const sum = sumPositiveNumbers(numbers);

    document.getElementById("result").textContent = "Сумма: " + sum;
}
