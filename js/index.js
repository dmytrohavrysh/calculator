const input = document.querySelector('.birth__input');
const calcBtn = document.querySelector('.birth__btn');
const copyBtn = document.querySelector('.copy-btn');
const birthOut = document.querySelector('.cell__birth-date');
const numOfDestOut = document.querySelector('.cell__destiny-number');
const col1 = document.getElementById('col1');
const col2 = document.getElementById('col2');
const col3 = document.getElementById('col3');
const col4 = document.getElementById('col4');
const col5 = document.getElementById('col5');
const col6 = document.getElementById('col6');
const col7 = document.getElementById('col7');
const col8 = document.getElementById('col8');
const col9 = document.getElementById('col9');
const col10 = document.getElementById('col10');
const col11 = document.getElementById('col11');
const col12 = document.getElementById('col12');
const col13 = document.getElementById('col13');
const col14 = document.getElementById('col14');

calcBtn.addEventListener('click', () => {
    if(input.value && input.validity.valid) {
        calculate(input.value)
    }
})

copyBtn.addEventListener('click', () => {
    navigator.clipboard
        .writeText(`${col2.textContent}/${col3.textContent}/${col4.textContent}/${col6.textContent}/${col7.textContent}/${col8.textContent}/${col10.textContent}/${col11.textContent}/${col12.textContent}/ЧД${numOfDestOut.textContent}`)
        .then(() => showPopup());
})

// @param date yyyy-mm-dd
function calculate(date) {
    const nums = date.split('-').map(el => el.split('')).flat().map(el => +el);
    const c1 = nums.reduce((acc, e) => acc + e, 0);
    const c2 = addDigits(c1);
    let c3 = nums[6] !== 0 ? c1 - 2 * nums[6]: c1 - 2 * nums[7];
    c3 = c3 >= 0 ? c3: -c3;
    const c4 = addDigits(c3);

    nums.push(...splitDigits(c1));
    nums.push(...splitDigits(c2));
    nums.push(...splitDigits(c3));
    nums.push(...splitDigits(c4));

    const res = [];

    for(let i = 0; i < nums.length; i++) {
        if(nums[i] !== 0) {
            res[nums[i] - 1] = res[nums[i] - 1] ? res[nums[i] - 1] + nums[i]: nums[i] + '';
        }
    }

    let destNum = c2;
    if(destNum >= 10 && destNum !== 11) {
        destNum = addDigits(destNum);
    }

    let temper = (res[2] || 0) + (res[4] || 0) + (res[6] || 0);
    temper = splitDigits(temper).filter(e => e !== 0).length;

    let aim = (res[0] || 0) + (res[3] || 0) + (res[6] || 0);
    aim = splitDigits(aim).filter(e => e !== 0).length;

    let family = (res[1] || 0) + (res[4] || 0) + (res[7] || 0);
    family = splitDigits(family).filter(e => e !== 0).length;

    let habit = (res[2] || 0) + (res[5] || 0) + (res[8] || 0);
    habit = splitDigits(habit).filter(e => e !== 0).length;

    let life = (res[3] || 0) + (res[4] || 0) + (res[5] || 0);
    life = splitDigits(life).filter(e => e !== 0).length;

    col1.textContent = temper;
    col2.textContent = res[0] || '-';
    col3.textContent = res[3] || '-';
    col4.textContent = res[6] || '-';
    col5.textContent = aim;
    col6.textContent = res[1] || '-';
    col7.textContent = res[4] || '-';
    col8.textContent = res[7] || '-';
    col9.textContent = family
    col10.textContent = res[2] || '-';
    col11.textContent = res[5] || '-';
    col12.textContent = res[8] || '-';
    col13.textContent = habit;
    col14.textContent = life;

    numOfDestOut.textContent = destNum;
    birthOut.textContent = date;
}

function addDigits(num) {
    return splitDigits(num).reduce((acc, e) => acc + e, 0);
}

function splitDigits(num) {
    return num.toString().split('').map(e => +e)
}

function showPopup() {
    const popup = document.querySelector('.copy-popup');
    popup.style.display = 'block';

    setTimeout(() => popup.style.display = 'none', 2000);
}