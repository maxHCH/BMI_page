var bmi = document.querySelector('.bmiInput');
var cal = document.querySelector('.bmiCal');
var cmInput = document.getElementById('cmInput');
var kgInput = document.getElementById('kgInput');
var showBmi = document.querySelector('.showBmi');
var clearData = document.querySelector('.clearData');
var showData = JSON.parse(localStorage.getItem('bmiData')) || [];

recodeBmi(showData);

cal.addEventListener('click',bmiCal);
clearData.addEventListener('click',clear);


function bmiCal(e) {
    var cm = (cmInput.value);
    var kg = kgInput.value;
    var str = '';
    //判斷是否為正確數值
    if(isNaN(cm) || isNaN(kg)){
        alert('請輸入正確數字');
        return;
    }else {
        str = (kg/(cm*cm/10000)).toFixed(2);
    }
    var bmiClass = '';
    var bmiRg = '';
    if(str < 18.5){
        bmiClass = '過輕';
        bmiRg = '<button type="button" class="btn btn-circle-feather " data-toggle="bmiRg" >'+str+'<p style="font-size:8px; margin-bottom:-5px;">BMI</p></button><div class="text-feather h5 text-center pt-2">'+bmiClass+'</div><a href="#" id="resetimg" style="background-color: #31BAF9;"></a>'
        cal.innerHTML = bmiRg;
    }else if (str >=18.5 && str <= 25 ) {
        bmiClass = '理想';
        bmiRg = '<button type="button" class="btn btn-circle-good " data-toggle="bmiRg" >'+str+'<p style="font-size:8px; margin-bottom:-5px;">BMI</p></button><div class="text-good h5 text-center pt-2">'+bmiClass+'</div><a href="#" id="resetimg" style="background-color: #86D73F;"></a>'
        cal.innerHTML = bmiRg;
    }else if (str >25 && str <= 30 ) {
        bmiClass = '過重';
        bmiRg = '<button type="button" class="btn btn-circle-heavy " data-toggle="bmiRg" >'+str+'<p style="font-size:8px; margin-bottom:-5px;">BMI</p></button><div class="text-heavy h5 text-center pt-2">'+bmiClass+'</div><a href="#" id="resetimg" style="background-color:#FF982D;"></a>'
        cal.innerHTML = bmiRg;
    }else if (str >30 && str <= 35 ) {
        bmiClass = '輕度肥胖';
        bmiRg = '<button type="button" class="btn btn-circle-fat-m " data-toggle="bmiRg" >'+str+'<p style="font-size:8px; margin-bottom:-5px;">BMI</p></button><div class="text-fat-m h5 text-center pt-2">'+bmiClass+'</div><a href="#" id="resetimg" style="background-color: #FF6C03;"></a>'
        cal.innerHTML = bmiRg;
    }
    else if (str >35 ) {
        bmiClass = '重度肥胖';
        bmiRg = '<button type="button" class="btn btn-circle-fat-l " data-toggle="bmiRg" >'+str+'<p style="font-size:8px; margin-bottom:-5px;">BMI</p></button><div class="text-fat-l h5 text-center pt-2">'+bmiClass+'</div><a href="#" id="resetimg" style="background-color: #FF1200;"></a>'
        cal.innerHTML = bmiRg;
    }
    //重置
    document.getElementById('resetimg').onclick = function(e) {
        e.preventDefault();
        if(e.target.nodeName == 'A'){
            e.stopPropagation();
            window.location.reload();
        }
    }
    var save = {
        you : cm ,
        youKg : kg ,
        youBmi : str,
        yourClass : bmiClass
    };
    showData.push(save);
    localStorage.setItem('bmiData', JSON.stringify(showData));
    recodeBmi(showData);
}


function recodeBmi(items) { //items = showdata
    str = '';
    var today = new Date();
    var len = items.length;
    for (var i = 0; len > i; i++) {
        str += '<div class="row d-flex align-items-center py-3 bg-white mb-3"><div class="col-lg-1"></div><div class="col-lg-3">' + items[i].yourClass + '</div><div class="col-lg-2 col-4"><span class="items mr-2">BMI</span>' + items[i].youBmi + '</div><div class="col-lg-2 col-4"><span class="items mr-2">weight</span>' + items[i].youKg + '<span class="items">kg</span></div><div class="col-lg-2 col-4"><span class="items mr-2">height</span>' + items[i].you + '<span class="items">cm</span></div><div class="items col-lg-2">'+today.getFullYear()+'/'+today.getMonth()+'/'+today.getDate()+'</div></div>';
    }
    showBmi.innerHTML = str;
}

//清除記錄
function clear(e){
    var len = showData.length;
    showData.splice(0,len);
    localStorage.setItem('bmiData', JSON.stringify(showData));
    recodeBmi(showData);
}


