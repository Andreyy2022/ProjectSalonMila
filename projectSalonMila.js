'use strict'

let surname = document.querySelector('#surname');
let name = document.querySelector('#name');
let patronymic = document.querySelector('#patronymic');
let phone = document.querySelector('#phone');
let button = document.querySelector('#button');
let table = document.querySelector('#table');
let ARR = [];

button.addEventListener('click', function() {
	
	if(surname.value !== '' || name.value !== '' || patronymic.value !== '' || phone.value !== '') {

		let obj = {
			surname_: '',
			name_: '',
			patronymic_: '',
			phone_: '',
		}

		obj.surname_ = surname.value;
		obj.name_ = name.value;
		obj.patronymic_ = patronymic.value;
		obj.phone_ = phone.value;

		if (localStorage.getItem('person') !== null) {
			ARR = JSON.parse(localStorage.getItem('person'));
		}

		ARR.push(obj);
		let json = JSON.stringify(ARR);
		localStorage.setItem('person', json);
	}
});

let newARR = JSON.parse(localStorage.getItem('person'));

if (newARR !== null) {
	for (let elem of newARR) {
		let TR = document.createElement('tr');
		table.appendChild(TR);
	
		for (let key in elem) {
			let TD = document.createElement('td');
			TD.innerHTML = elem[key];
			TR.appendChild(TD);
		}
	}	

}

let ARRVis = [];
let TRs = document.querySelectorAll('tr');
for (let i = 1; i < TRs.length; i++) {
	//создание импутов
    let Inp = document.createElement('input');
	TRs[i].appendChild(Inp);
	
	//формируем первоначальную базу для значений импутов
	if (localStorage.getItem('visit') !== null) {
		ARRVis = JSON.parse(localStorage.getItem('visit'));
	} else {
	let objVis = {visit_: 1};
	ARRVis.push(objVis);
	}
	let objVis = {visit_: 1};
	ARRVis.push(objVis);
}
	
localStorage.setItem('visit', JSON.stringify(ARRVis));

//из базы в таблицу первоначально
let result = JSON.parse(localStorage.getItem('visit'));
let Inps = document.querySelectorAll('input');
for (let i = 4; i < Inps.length; i++) {
	Inps[i].value = result[i-4].visit_;
}

//из таблицы в базу (после изменения)
for (let i = 4; i < Inps.length; i++) {
	Inps[i].addEventListener('input', function() {
	result[i-4].visit_ = this.value;
	localStorage.setItem('visit', JSON.stringify(result));
	});
}

//из базы в таблицу
let result_ = JSON.parse(localStorage.getItem('visit'));
for (let i = 4; i < Inps.length; i++) {
	Inps[i].value = result_[i-4].visit_;
	if (Inps[i].value == 4) {
		Inps[i].style.color = 'blue';
	}
	if (Inps[i].value == 5) {
		Inps[i].style.color = 'red';
	}
}

//localStorage.clear();