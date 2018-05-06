var get = function(id) {
	return document.getElementById(id);
};
var count_rows = 1;
window.onload = function() {
	get("bt_add").onclick = function() {
		add_column();
	};
	get("bt_delete").onclick = function() {
		delete_column();
	};
	get("get_result").onclick = function() {
		if (count_rows == 1) {
			alert("Введите данные");
			return;
		}
		setTimeout(function() {
			add_char('myChart', 'exp_info');
		}, 1000);
		setTimeout(function() {
			add_char('myChart2', 'mid_info');
		}, 1000);
		setTimeout(function() {
			add_char('myChart3', 'kv_info');
		}, 1000);
	};
};

function add_char(path, path_bar) {
	var now_arr = set_arr_values();
	if (path == 'myChart') {
		now_arr[now_arr.length] = U(now_arr);
	} else {
		if (path == 'myChart2') {
			now_arr[now_arr.length] = y(now_arr);
		} else {
			now_arr[now_arr.length] = kv(now_arr);
		}
	}
	var ctx = get(path).getContext('2d');
	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: set_arr_caption(),
			datasets: [{
				label: "Значения",
				backgroundColor: 'white',
				borderColor: 'red',
				data: now_arr,
			}]
		},
		options: {}
	});
	var clone = now_arr.slice(0);
	setTimeout(function() {
		exp_info_set(clone, path_bar);
	}, 1000);
}

function exp_info_set(arr, path_bar) {
	const arr1 = arr;
	if (path_bar == 'exp_info') {
		var res = arr1.splice(arr1.length - 1, 1);
		var count_values = count_rows;
		var t = count_rows + 1;
		get('exp_info').innerText = 'Кол-во наблюдений (n) - ' + count_values + "\n Массив значений - " + arr1 + "\n\n Ожидаемое значение U( t+1 )= " + res + "\n\n Вычесленное по формуле \n U( t+1 ) = a * y( t ) + ( 1-a ) * U( t )" + "\n\n где a( параметр сглаживания ) = " + 2 / (count_values + 1).toFixed(2) + "\n\n t+1( номер предсказываемого наблюдения ) = " + t;
	} else {
		if (path_bar == 'mid_info') {
			var count_values = count_rows;
			var res = arr1.splice(arr1.length - 1, 1);
			get('mid_info').innerText = 'Кол-во наблюдений (n) - ' + count_values + "\n Массив значений - " + arr1 + "\n\n Ожидаемое значение y( t+1 )= " + res + "\n\n Вычесленное по формуле \n y( t+1 ) = m( t-1 ) + 1/n * ( y( t )- y( t-1 ) ) " + "\n при n = 3 " + "\n\n где m( t-1 )(скользящая средняя за два периода до прогнозного)";
		}
        else {
            var count_values = count_rows;
			var res = arr1.splice(arr1.length - 1, 1);
			get('kv_info').innerText = 'Кол-во наблюдений (n) - ' + count_values +
             "\n Массив значений - " + arr1 +
              "\n\n Ожидаемое значение y( t+1 )= " + res;
        }
	}
}

function set_arr_caption() {
	var arr = [];
	var j = 0;
	var e = get("tr1");
	for (var i = 0; i < e.childNodes.length; i++) {
		if (e.childNodes[i].nodeType == 1) {
			arr[j] = e.childNodes[i].childNodes[0].value;
			j++;
		}
	}
	arr[arr.length] = "Предсказанный";
	return arr;
}

function add_column(last_value) {
	var count = count_rowsf();
	if (count_rows <= 12) {
		var newtd1 = document.createElement("td");
		var str_id1 = "td1_" + count_rows;
		newtd1.id = str_id1;
		get("tr1").appendChild(newtd1);
		var newinput1 = document.createElement("input");
		newinput1.value = "#" + (count + 1);
		get(str_id1).appendChild(newinput1);
		var newtd2 = document.createElement("td");
		var str_id2 = "td2_" + count_rows;
		newtd2.id = str_id2;
		get("tr2").appendChild(newtd2);
		var newinput2 = document.createElement("input");
		if (last_value != undefined) {
			newinput2.value = last_value;
		} else {
			newinput2.value = 0;
		}
		get(str_id2).appendChild(newinput2);
		count_rows++
	} else {
		if (count_rows == 13 && last_value != undefined) {
			var newtd1 = document.createElement("td");
			var str_id1 = "td1_" + count_rows;
			newtd1.id = str_id1;
			get("tr1").appendChild(newtd1);
			var newinput1 = document.createElement("input");
			get(str_id1).appendChild(newinput1);
			var newtd2 = document.createElement("td");
			var str_id2 = "td2_" + count_rows;
			newtd2.id = str_id2;
			get("tr2").appendChild(newtd2);
			var newinput2 = document.createElement("input");
			if (last_value != undefined) {
				newinput2.value = last_value;
			}
			get(str_id2).appendChild(newinput2);
			count_rows++
		} else {
			alert('максимальное число полей для ввода');
		}
	}
}

function count_rowsf() {
	var count = 0;
	for (var i = 0; i < get("tr1").childNodes.length; i++) {
		if (get("tr1").childNodes[i].nodeType == 1) {
			count++;
		}
	}
	return count;
}

function delete_column() {
	var parent_node = get('tr1');
	parent_node.removeChild(parent_node.lastChild);
	parent_node = get('tr2');
	parent_node.removeChild(parent_node.lastChild);
}
var main_arr = [];
var j = 0;

function get_result() {
	var e = get("tr2");
	for (var i = 0; i < e.childNodes.length; i++) {
		if (e.childNodes[i].nodeType == 1) {
			main_arr[j] = e.childNodes[i].childNodes[0].value;
			j++;
		}
	}
	console.log(main_arr);
	return main_arr;
}

function set_arr_values() {
	var arr = [];
	var j = 0;
	var e = get("tr2");
	for (var i = 0; i < e.childNodes.length; i++) {
		if (e.childNodes[i].nodeType == 1) {
			arr[j] = e.childNodes[i].childNodes[0].value;
			j++;
		}
	}
	return arr;
}

function U(arr, n) {
	if (n == undefined) {
		n = arr.length;
	}
	if (n != 0) {
		return (a(arr) * arr[n - 1] + (1 - a(arr)) * U(arr, n - 1)).toFixed(2);
	} else {
		return U0(arr);
	}
}

function U0(arr) {
	var sum = 0;
	for (var i = 0; i < arr.length; i++) {
		sum += +arr[i];
	}
	return (sum / arr.length).toFixed(2);
}

function a(arr) {
	return (2 / (arr.length + 1)).toFixed(2);
}

function y(arr) {
	if (arr.length < 3) {
		return 0;
	}
	const arr1 = arr;
	var arr_mid = [];
	arr_mid.length = arr1.length - 2;
	for (var i = 0; i < arr_mid.length; i++) {
		arr_mid[i] = ((+arr1[i] + +arr1[i + 1] + +arr1[i + 2]) / 3).toFixed(2);
	}
	var uuu = +(+arr_mid[arr_mid.length - 1] + +(+arr[arr1.length - 1] - +arr[arr1.length - 2]) / 3);
	return uuu.toFixed(2);
}

function kv(arr) {
	const arr1 = arr;
	var n = arr1.length;
	var Xarr = [];
    var Xarr2 = [];
	for (var i = 0; i < n; i++) {
		Xarr[i] = i + 1;
	}
    for (var i = 0; i < n; i++) {
		Xarr2[i] = (i + 1) * (i + 1);
	}
	var sum1 = arr1.reduce(function(sum, current) {
		return sum + +current;
	}, 0);
    var sum2 = Xarr.reduce(function(sum, current) {
		return sum + +current;
	}, 0);

    var arr1_arr2 = [];
    for(var i =0; i < n ; i ++){
        arr1_arr2[i] = arr1[i]*Xarr[i];
    }

    var sum3 = arr1_arr2.reduce(function(sum, current) {
		return sum + +current;
	}, 0);

    var sum4 = Xarr2.reduce(function(sum, current) {
        return sum + +current;
    }, 0);

    var a = (sum3 - (sum1*sum2)/n)/(sum4 - (sum2*sum2)/n);
    var b = (sum1)/n - (a*sum2)/n;

    return +(a*(n+1) + b).toFixed(2);
}
