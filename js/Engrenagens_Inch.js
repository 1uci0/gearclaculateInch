// Tem a função de mudar o display da Entrada de dados
function DadosdeEntrada(x, y) {
    indice1 = x;
    var target = y;
    var url = '/html/Studies/' + indice1 + ' ' + target + '.html';
    var right = document.querySelector('.right');

    if (indice1 === 'geometric') {
        document.querySelector('.right').style.height = 40 + '%';
    }
    else if (indice1 === 'dynamic kinematic') {
        document.querySelector('.right').style.height = 40 + '%';
    }
    else if (indice1 === 'strain') {
        document.querySelector('.right').style.height = 40 + 'px';
    }

    var xml = new XMLHttpRequest();

    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200) {
            document.getElementById(target).innerHTML = xml.responseText;
            right.style.display = 'block';
        }
    }

    xml.open("GET", url, true)

    xml.send()

}

// Tem a função de checar a relação de transmissão e a potência transmitida
function checkParameter() {

    if (indice1 === 'geometric') {
        var i = document.getElementById('i');

        if (i.checked == true) {
            document.getElementById('z2').name = 'coluna1';
            document.getElementById('d2').name = 'coluna1';
        }
        else {
            document.getElementById('z2').name = 'coluna2';
            document.getElementById('d2').name = 'coluna2';
        }

    }
    else if (indice1 === 'dynamic kinematic') {
        var h = document.getElementById('h');

        if (h.checked == true) {
            document.getElementById('t1').name = 'coluna3';
            document.getElementById('t2').name = 'coluna3';
        }
        else {
            document.getElementById('t1').name = 'coluna4';
            document.getElementById('t2').name = 'coluna4';
        }

    }

}

// Tem a função confirmar os parâmetros e mudar o display de inserir os dados
function ConfParameter(x, y) {
    var indice = x;
    var target = y;
    var url = '/html/Parameters/' + indice + ' ' + target + '.html';
    var insertParameter = document.querySelector('.insertParameter');

    var xml = new XMLHttpRequest();

    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200) {
            document.getElementById(target).innerHTML = xml.responseText;
            insertParameter.style.display = 'block';
            checkParameter();

            if (indice1 === 'geometric') {
                if (i.checked == true) {
                    iTrue();
                }
                else {
                    iFalse();
                }

            }
            else if (indice1 === 'dynamic kinematic') {
                if (h.checked == true) {
                    hTrue();
                }
                else {
                    hFalse();
                }
                
            }
            else if (indice1 === 'strain') {
                if (localStorage.Tensao === 'bending strength') {
                    CpmFactor();
                }
                else {
                    CoeficienteElastico();
                }
            }

        }

    }

    xml.open("GET", url, true)

    xml.send()
    localStorage.Tensao = x;
}

// Tem a função de identificar quais parâmetros são requeridos
function iTrue() {
    var coluna1 = document.querySelector('input[name="coluna1"]:checked').value.toUpperCase();

    if (coluna1 == 'Z1') {
        document.querySelector('.Z1').style.display = 'block';
    }
    else if (coluna1 == 'D1') {
        document.querySelector('.D1').style.display = 'block';
    }
    else if (coluna1 == 'Z2') {
        document.querySelector('.Z2').style.display = 'block';
    }
    else if (coluna1 == 'D2') {
        document.querySelector('.D2').style.display = 'block';
    }

    document.querySelector('.I').style.display = 'block';

}

function iFalse() {
    var coluna1 = document.querySelector('input[name="coluna1"]:checked').value.toUpperCase();
    var coluna2 = document.querySelector('input[name="coluna2"]:checked').value.toUpperCase();

    if (coluna1 == 'Z1') {
        document.querySelector('.Z1').style.display = 'block';
    }
    else {
        document.querySelector('.D1').style.display = 'block';
    }

    if (coluna2 == 'Z2') {
        document.querySelector('.Z2').style.display = 'block';
    }
    else {
        document.querySelector('.D2').style.display = 'block';
    }

}

function hTrue() {
    var coluna3 = document.querySelector('input[name="coluna3"]:checked').value.toUpperCase();

    if (coluna3 == 'N1') {
        document.querySelector('.N1').style.display = 'block';
    }
    else if (coluna3 == 'N2') {
        document.querySelector('.N2').style.display = 'block';
    }
    else if (coluna3 == 'T1') {
        document.querySelector('.T1').style.display = 'block';
    }
    else if (coluna3 == 'T2') {
        document.querySelector('.T2').style.display = 'block';
    }

    document.querySelector('.H').style.display = 'block';
}

function hFalse() {
    var coluna3 = document.querySelector('input[name="coluna3"]:checked').value.toUpperCase();
    var coluna4 = document.querySelector('input[name="coluna4"]:checked').value.toUpperCase();

    if (coluna3 == 'N1') {
        document.querySelector('.N1').style.display = 'block';
    }
    else {
        document.querySelector('.N2').style.display = 'block';
    }

    if (coluna4 == 'T1') {
        document.querySelector('.T1').style.display = 'block';
    }
    else if (coluna4 == 'T2') {
        document.querySelector('.T2').style.display = 'block';
    }

}

function Calcular(x, y) {
    var indice = x;
    var target = y;
    var url = '/html/Results/' + indice + ' ' + target + '.html';

    var xml = new XMLHttpRequest();

    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200) {
            document.getElementById(target).innerHTML = xml.responseText;

            if (indice1 === 'geometric') {
                AnaliseGeometrica();
            }
            else if (indice1 === 'dynamic kinematic') {
                AnaliseCinematicaDinamica();
            }
            else if (indice1 === 'strain') {
                if (indice === 'bending strength') {
                    AnaliseTensoesFlexao();
                }
                else {
                    AnaliseTensoesContato();
                }
            }
        }
    }

    xml.open("GET", url, true)

    xml.send()
}

function AnaliseGeometrica() {
    // Análise geométrica
    // Parâmetros iniciais
    
    var psi = Number(window.document.getElementById('psi').value); //ok
    var psiRadianos = psi*(Math.PI/180); //ok
    var passoDiametral = document.querySelector('input[name="passoDiametral"]:checked').value;
    var x1 = Number(window.document.getElementById('x').value); //ok
    var x2 = -x1;
    var ka = Number(window.document.getElementById('ka').value); //ok

    if (psi != 0) {
        if (passoDiametral === 'pdt' ) {
            var pd_t = Number(window.document.getElementById('pd-t').value); //ok
            var phi_t = Number(window.document.getElementById('phi-t').value); //ok

            var pd_n = pd_t/Math.cos(psiRadianos); //ok
            var phi_t_Radianos = phi_t*(Math.PI/180); //ok
            var phi_n_Radianos = Math.atan(Math.tan(phi_t_Radianos)*Math.cos(psiRadianos)); //ok
            var phi_n = 180*phi_n_Radianos/Math.PI; //ok
            
            document.querySelector('.maisParameter1').style.marginLeft = 30 + '%';
            document.querySelector('.maisParameter2').style.width = 40 + '%';
            document.querySelector('.maisParameter2').style.height = 150 + 'px';
            document.querySelector('.maisParameter3').style.height = 100 + '%';
            document.querySelector('.maisParameter4').style.height = 60 + '%';

            document.querySelector('.pdn').style.display = 'block';
            document.querySelector('.phi-n-n').style.display = 'block';
            document.querySelector('.pn').style.display = 'block';
            document.querySelector('.pt').style.display = 'block';
            document.querySelector('.pbn').style.display = 'block';
            document.querySelector('.pbt').style.display = 'block';

            document.querySelector('.pc').style.display = 'none';
            document.querySelector('.pb').style.display = 'none';
        }
        else {
            var pd_n = Number(window.document.getElementById('pd-n').value); //ok
            var phi_n = Number(window.document.getElementById('phi-n').value); //ok

            var pd_t = pd_n*Math.cos(psiRadianos); //ok
            var phi_n_Radianos = phi_n*(Math.PI/180); //ok
            var phi_t_Radianos = Math.atan((Math.tan(phi_n_Radianos))/(Math.cos(psiRadianos))); //ok
            var phi_t = 180*phi_t_Radianos/Math.PI; //ok

            document.querySelector('.maisParameter1').style.marginLeft = 30 + '%';
            document.querySelector('.maisParameter2').style.width = 40 + '%';
            document.querySelector('.maisParameter2').style.height = 150 + 'px';
            document.querySelector('.maisParameter3').style.height = 100 + '%';
            document.querySelector('.maisParameter4').style.height = 60 + '%';

            document.querySelector('.pdt').style.display = 'block';
            document.querySelector('.Φt').style.display = 'block';
            document.querySelector('.pn').style.display = 'block';
            document.querySelector('.pt').style.display = 'block';
            document.querySelector('.px').style.display = 'block';
            document.querySelector('.pbn').style.display = 'block';

            document.querySelector('.pbt').style.display = 'none';
            document.querySelector('.pc').style.display = 'none';
            document.querySelector('.pb').style.display = 'none';
        }
    }
    else {
        var pd_t = Number(window.document.getElementById('pd-t').value); //ok
        var phi_t = Number(window.document.getElementById('phi-t').value); //ok

        var pd_n = pd_t/Math.cos(psiRadianos); //ok
        var phi_t_Radianos = phi_t*(Math.PI/180); //ok
        var phi_n_Radianos = Math.atan((Math.tan(phi_t_Radianos))/(Math.cos(psiRadianos))); //ok
        var phi_n = 180*phi_n_Radianos/Math.PI; //ok
    }

    // Relação de transmissão
    var i1 = Number(window.document.getElementById('I1').value); //ok
    var i2 = Number(window.document.getElementById('I2').value); //ok
    var i = i2/i1; //ok

    if (i > 8) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Caro usuário, a relação de transmissão escolhida é maior do que a recomendada!',
        })
    }

    // Engrenagem 1
    var z1 = Number(window.document.getElementById('Z1').value); //ok
    var d1 = Number(window.document.getElementById('D1').value); //ok

    // Engrenagem 2
    var z2 = Number(window.document.getElementById('Z2').value); //ok
    var d2 = Number(window.document.getElementById('D2').value); //ok

    // Verificando quantas variáveis o usuário digitou
    var lista = [z1,z2,d1,d2,i]; //ok
    var cont = 0; //ok

    // encontrar quantas variáveis foram preenchidas
    for (j = 0; j < lista.length; j++) {
        if (lista[j] > 0) {
            cont++;
        }
    } //ok

    var varPreenchida = cont; //ok
    
    if (varPreenchida < 2) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Caro usuário, preencha todos os parâmetros escolhidos!',
        })
    }
    else {
        document.getElementById("Calcular").disabled = true; //ok
        var resultados = document.querySelector('.resultados'); //ok
        resultados.style.display = 'block'; //ok
        document.getElementById("est-cinematico").disabled = false; //ok
        document.getElementById('Pdn-Pdt').disabled = true; //ok
        document.getElementById('Pdt-Pdn').disabled = true; //ok
        document.getElementById('pd-t').disabled = true; //ok
        document.getElementById('pd-n').disabled = true; //ok
        document.getElementById('phi-t').disabled = true; //ok
        document.getElementById('phi-n').disabled = true; //ok
        document.getElementById('psi').disabled = true; //ok
        document.getElementById('x').disabled = true; //ok
        document.getElementById('ka').disabled = true; //ok

        document.getElementById('Z1').disabled = true; //ok
        document.getElementById('Z2').disabled = true; //ok
        document.getElementById('D1').disabled = true; //ok
        document.getElementById('D2').disabled = true; //ok
        document.getElementById('I1').disabled = true; //ok
        document.getElementById('I2').disabled = true; //ok
        
        if (i1 == '' && i2 == '') {
    
            if (z1 != '' && z2 != '') {
                var d1 = z1/pd_t; //ok
                var d2 = z2/pd_t; //ok
            }
    
            else if (z1 != '' && d2 != '') {
                var d1 = z1/pd_t; //ok
                var z2 = pd_t*d2; //ok
            }
    
            else if (d1 != '' && d2 != '') {
                var z1 = pd_t*d1; //ok
                var z2 = pd_t*d2; //ok
            }
    
            else if (d1 != '' && z2 != '') {
                var z1 = pd_t*d1; //ok
                var d2 = z2/pd_t; //ok
            }
    
        }
        else {

            if (z1 != '') {
                var d1 = z1/pd_t; //ok
                var z2 = i*z1; //ok
                var d2 = i*d1; //ok
            }
    
            else if (d1 != '') {
                var z1 = pd_t*d1; //ok
                var z2 = i*z1; //ok
                var d2 = i*d1; //ok
            }
    
            else if (z2 != '') {
                var d2 = z2/pd_t; //ok
                var z1 = z2/i; //ok
                var d1 = d2/i; //ok
            }
    
            else if (d2 != '') {
                var z2 = pd_t*d2; //ok
                var z1 = z2/i; //ok
                var d1 = d2/i; //ok
            }
    
        }
        var i = z2/z1; //ok

        if (i > 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Caro usuário, a relação de transmissão obtida é maior do que a recomendada!',
            })
        }

        // Interferência no pinhão e na coroa - número mínimo de dentes que o pinhão deve possuir para que não haja interferência e o maior número de dentes da coroa
        var z1_min = ((2*ka*Math.cos(psiRadianos))/((1+2*i)*Math.sin(phi_t_Radianos)**2))*(i+Math.sqrt(i**2+(1+2*i)*Math.sin(phi_t_Radianos)**2)); //ok
        var z2_max = (((z1**2)*Math.sin(phi_t_Radianos)**2-4*(ka**2)*Math.cos(psiRadianos)**2)/(4*ka*Math.cos(psiRadianos)-2*z1*Math.sin(phi_t_Radianos)**2)); //ok

        if (z1 < z1_min) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Caro usuário, há interferência no par de engrenagens!',
            })
        }

        var z = [z1,z2]; //ok
        var d = [d1,d2]; //ok
        var x = [x1,x2]; //ok

        var dv = [], de = [], dr = [], a = [], b = [], ht = [], db = [], st = []; //ok

        for (let i = 0; i < 2; i++) {
            dv[i] = d[i] + 2*x[i]/pd_n; //ok
            de[i] = d[i] + 2*(ka + x[i])/pd_n; //ok

            if (i == 1) {
                var C = 0.5*(dv[i-1] + dv[i]); //ok
            }
        }

        for (let i = 0; i < 2; i++) {
            if (i == 0) {
                dr[i] = 2*(C - 0.5*de[i+1] - 0.25/pd_n); //ok
            }
            else if (i == 1) {
                dr[i] = 2*(C - 0.5*de[i-1] - 0.25/pd_n); //ok
            }

            a[i] = 0.5*(de[i] - d[i]); //ok
            b[i] = 0.5*(d[i] - dr[i]); //ok
            ht[i] = a[i] + b[i]; //ok
            db[i] = d[i]*Math.cos(phi_t_Radianos); //ok
            st[i] = (1/pd_n)*(0.5*Math.PI + 2*x[i]*Math.tan(phi_n_Radianos)); //ok
        }

        var de1 = de[0]; //ok
        var de2 = de[1]; //ok

        var dr1 = dr[0]; //ok
        var dr2 = dr[1]; //ok

        var ht1 = ht[0]; //ok
        var ht2 = ht[1]; //ok

        var db1 = db[0]; //ok
        var db2 = db[1]; //ok

        // passos medidos no diâmetro primitivo
        var pn = Math.PI/pd_n; //ok
        var pt = pn/Math.cos(psiRadianos); //ok
        var px = pt/Math.tan(psiRadianos); //ok

        // passos medidos no diâmetro de base
        var pbn = pn*Math.cos(phi_n_Radianos); //ok
        var pbt = Math.PI*db1/z1; //ok
        var pbx = px*Math.cos(phi_n_Radianos); //ok

        // Mostrar a interferência e os parâmetros geométricos
        window.document.getElementById('z-1-min').value = Math.ceil(z1_min);; //ok
        window.document.getElementById('z-2-max').value = Math.floor(z2_max); //ok

        window.document.getElementById('z-1').value = z[0]; //ok
        window.document.getElementById('z-2').value = z[1]; //ok
    
        window.document.getElementById('d-1').value = d[0].toFixed(2); //ok
        window.document.getElementById('d-2').value = d[1].toFixed(2); //ok
    
        window.document.getElementById('a-1').value = a[0].toFixed(2); //ok
        window.document.getElementById('a-2').value = a[1].toFixed(2); //ok
    
        window.document.getElementById('b-1').value = b[0].toFixed(2); //ok
        window.document.getElementById('b-2').value = b[1].toFixed(2); //ok
    
        window.document.getElementById('ht-1').value = ht[0].toFixed(2); //ok
        window.document.getElementById('ht-2').value = ht[1].toFixed(2); //ok
    
        window.document.getElementById('de-1').value = de[0].toFixed(2); //ok
        window.document.getElementById('de-2').value = de[1].toFixed(2); //ok
    
        window.document.getElementById('dr-1').value = dr[0].toFixed(2); //ok
        window.document.getElementById('dr-2').value = dr[1].toFixed(2); //ok
    
        window.document.getElementById('db-1').value = db[0].toFixed(2); //ok
        window.document.getElementById('db-2').value = db[1].toFixed(2); //ok

        window.document.getElementById('st-1').value = st[0].toFixed(2); //ok
        window.document.getElementById('st-2').value = st[1].toFixed(2); //ok

        window.document.getElementById('pc').value = pn.toFixed(2); //ok
        window.document.getElementById('pb').value = pbn.toFixed(2); //ok

        window.document.getElementById('P-d-n').value = pd_n.toFixed(2); //ok
        window.document.getElementById('Phi-n-n').value = phi_n.toFixed(2); //ok
        window.document.getElementById('Pd-t').value = pd_t.toFixed(2); //ok
        window.document.getElementById('Phi-t').value = phi_t.toFixed(2); //ok
        window.document.getElementById('pn').value = pn.toFixed(2); //ok
        window.document.getElementById('pt').value = pt.toFixed(2); //ok
        window.document.getElementById('px').value = px.toFixed(2); //ok
        window.document.getElementById('pbn').value = pbn.toFixed(2); //ok
        window.document.getElementById('pbt').value = pbt.toFixed(2); //ok

        // salvando no localStorage
        localStorage.i = i; //ok
        localStorage.ka = ka; //ok
        localStorage.pd_n = pd_n; //ok 
        localStorage.pd_t = pd_t; //ok 
        localStorage.phi_n_Radianos = phi_n_Radianos; //ok
        localStorage.psiRadianos = psiRadianos; //ok
        localStorage.phi_t_Radianos = phi_t_Radianos; //ok
        localStorage.phi_n = phi_n; //ok
        localStorage.phi_t = phi_t; //ok

        localStorage.pn = pn; //ok
        localStorage.pt = pt; //ok
        localStorage.px = px; //ok

        localStorage.pbn = pbn; //ok
        localStorage.pbt = pbt; //ok
        localStorage.pbx = pbx; //ok

        localStorage.z1 = z1; //ok
        localStorage.z2 = z2; //ok

        localStorage.d1 = d1; //ok
        localStorage.d2 = d2; //ok

        localStorage.de1 = de1; //ok
        localStorage.de2 = de2; //ok

        localStorage.dr1 = dr1; //ok
        localStorage.dr2 = dr2; //ok

        localStorage.ht1 = ht1; //ok
        localStorage.ht2 = ht2; //ok

        localStorage.db1 = db1; //ok
        localStorage.db2 = db2; //ok

        localStorage.x1 = x1; //ok
        localStorage.x2 = x2; //ok

        localStorage.C = C; //ok
    }
}

function angulodehelice() {

    var ψ = Number(document.getElementById('psi').value);
    var passoDiametral = document.querySelector('input[name="passoDiametral"]:checked').value;

    if (ψ != 0) {
        document.querySelector('.Pdn-Pdt').style.display = 'block';

        if (passoDiametral === 'pdt' ) {
            document.querySelector('.Pd').style.display = 'block';
            document.querySelector('.Φ').style.display = 'block';
            document.querySelector('.Pnd').style.display = 'none';
            document.querySelector('.Φn').style.display = 'none';
        }
        else {
            document.querySelector('.Pnd').style.display = 'block';
            document.querySelector('.Φn').style.display = 'block';
            document.querySelector('.Pd').style.display = 'none';
            document.querySelector('.Φ').style.display = 'none';
        }
    }
    else {
        document.querySelector('.Pdn-Pdt').style.display = 'none';
        document.querySelector('.Pnd').style.display = 'none';
        document.querySelector('.Φn').style.display = 'none';
        document.querySelector('.Pd').style.display = 'block';
        document.querySelector('.Φ').style.display = 'block';
    }
}

function mostrarMais() {
    if (document.getElementById("mostrarMais").style.display == 'block') {
        document.getElementById("mostrarMais").style.display = 'none';
        document.getElementById("MostrarMais").value = 'Mostrar mais';
    }
    else {
        document.getElementById("mostrarMais").style.display = 'block';
        document.getElementById("MostrarMais").value = 'Ocultar';
    }
}

function AnaliseCinematicaDinamica() {
    // buscando do localStorage
    var i = Number(localStorage.i); //ok
    var d1 = Number(localStorage.d1); //ok
    var d2 = Number(localStorage.d2); //ok
    var phi_n_Radianos = Number(localStorage.phi_n_Radianos); //ok
    var psiRadianos = Number(localStorage.psiRadianos); //ok
    var phi_t_Radianos = Number(localStorage.phi_t_Radianos); //ok

    // Análise cinemática e dinâmica

    // Potência transmitida
    var unidadeH = window.document.getElementById('unidadeH').value; //ok

    if (unidadeH === 'hp') {
        var H = Number(window.document.getElementById('H').value); //ok

        if (H > 25e3/0.98632) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Caro usuário, a potência transmitida pelo conjunto é maior do que a recomendada!',
            })
        }
    }
    else {
        var H = 0.98632*Number(window.document.getElementById('H').value); //ok

        if (H > 25e3) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Caro usuário, a potência transmitida pelo conjunto é maior do que a recomendada!',
            })
        }
    }

    // Engrenagem 1
    var n1 = Number(window.document.getElementById('N1').value); //ok
    var t1 = Number(window.document.getElementById('T1').value); //ok

    // Engrenagem 2
    var n2 = Number(window.document.getElementById('N2').value); //ok
    var t2 = Number(window.document.getElementById('T2').value); //ok

    // Verificando quantas variáveis o usuário digitou
    var lista = [n1,n2,t1,t2,H]; //ok
    var cont = 0; //ok

    // encontrar quantas variáveis foram preenchidas
    for (j = 0; j < lista.length; j++) {
        if (lista[j] > 0) {
            cont++;
        }
    } //ok

    var varPreenchida = cont; //ok
    
    if (varPreenchida < 2) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Caro usuário, preencha todos os parâmetros escolhidos!',
        })
    }
    else {
        document.getElementById("Calcular").disabled = true; //ok
        var resultados = document.querySelector('.resultados'); //ok
        resultados.style.display = 'block'; //ok
        document.getElementById("est-tensoes").disabled = false; //ok

        document.getElementById('N1').disabled = true; //ok
        document.getElementById('N2').disabled = true; //ok
        document.getElementById('T1').disabled = true; //ok
        document.getElementById('T2').disabled = true; //ok
        document.getElementById('H').disabled = true; //ok
        document.getElementById('unidadeH').disabled = true; //ok

        if (H == '') {

            if (n1 != '' && t1 != '') {
                var n2 = n1/i;  //ok
                var t2 = i*t1;  //ok
            }

            else if (n1 != '' && t2 != '') {
                var t1 = t2/i;  //ok
                var n2 = n1/i;  //ok
            }

            else if (n2 != '' && t1 != '') {
                var n1 = i*n2;  //ok
                var t2 = i*t1;  //ok
            }

            else if (n2 != '' && t2 != '') {
                var n1 = i*n2;  //ok
                var t1 = t2/i;  //ok
            }
            var wt = 2*t1/d1;  //ok
        }
        else {

            if (n1 != '') {
                var wt = 396e3*H/(Math.PI*d1*n1);  //ok
                var t1 = 0.5*d1*wt;  //ok
    
                var n2 = n1/i;  //ok
                var t2 = i*t1;  //ok
            }

            else if (n2 != '') {
                var wt = 396e3*H/(Math.PI*d2*n2);  //ok
                var t2 = 0.5*d2*wt;  //ok
    
                var n1 = i*n2;  //ok
                var t1 = t2/i;  //ok
            }

            else if (t1 != '') {
                var wt = 2*t1/d1;  //ok
                var n1 = 396e3*H/(Math.PI*d1*wt);  //ok

                var n2 = n1/i;  //ok
                var t2 = i*t1;  //ok
            }

            else if (t2 != '') {
                var wt = 2*t2/d2;  //ok
                var n2 = 396e3*H/(Math.PI*d2*wt);  //ok

                var n1 = i*n2;  //ok
                var t1 = t2/i;  //ok
            }
        }
        var H = (Math.PI*d1*n1*wt)/396e3;  //ok

        if (H > 25e3/0.98632) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Caro usuário, a potência transmitida pelo conjunto é maior do que a recomendada!',
            })
        }

        // velocidades no diâmetro primitivo
        var v1 = Math.PI*d1*n1/12; //ok
        var v2 = v1; //ok

        var n = [n1,n2]; //ok
        var t = [t1,t2]; //ok
        var v = [v1,v2]; //ok

        // Força na engrenagem e suas componentes
        var w = wt/(Math.cos(phi_n_Radianos)*Math.cos(psiRadianos));  //ok
        var wr = wt*Math.tan(phi_t_Radianos);  //ok
        var wa = wt*Math.tan(psiRadianos);  //ok

        if (psiRadianos != 0) {
            document.querySelector('.w-a').style.display = 'block';
        }

        // Mostrar a análise cinemática e dinâmica
        window.document.getElementById('n-1').value = n[0].toFixed(1); //ok
        window.document.getElementById('n-2').value = n[1].toFixed(1); //ok

        window.document.getElementById('t-1').value = t[0].toFixed(2); //ok
        window.document.getElementById('t-2').value = t[1].toFixed(2); //ok

        window.document.getElementById('w').value = w.toFixed(2); //ok
        window.document.getElementById('w-t').value = wt.toFixed(2); //ok
        window.document.getElementById('w-r').value = wr.toFixed(2); //ok
        window.document.getElementById('w-a').value = wa.toFixed(2); //ok

        // salvando no localStorage
        localStorage.wt = wt; //ok
        localStorage.v1 = v1; //ok
        localStorage.v2 = v2; //ok
        localStorage.n1 = n1; //ok
        localStorage.n2 = n2; //ok
    }
}

function AnaliseTensoesFlexao() {
    // análise de tensões de flexão
    // Parâmetros iniciais
    var F1 = Number(document.getElementById('F1').value); //ok largura de face do pinhão
    var F2 = Number(document.getElementById('F2').value); //ok largura de face da coroa
    var ko1 = Number(document.querySelector('input[name="ko"]:checked').value); //ok
    var s1 = Number(document.getElementById('S1').value); //ok
    var N = Number(document.getElementById('N-ciclos').value);
    var Lh = Number(document.getElementById('T-vida').value);
    var FS = Number(document.getElementById('S-F').value);
    var Qv = Number(window.document.getElementById('Qv').value); //ok
    var Cmc =  Number(window.document.getElementById('perfilEngrenamento').value); //ok
    var condicaoEngrenamento = Number(window.document.getElementById('condicaoEngrenamento').value); //ok
    var Ce = Number(window.document.getElementById('AjusteEngrenamento').value); //ok
    var deixo1 = Number(document.getElementById('do-1').value);
    var deixo2 = Number(document.getElementById('do-2').value);
    var materialPinhao = Number(localStorage.materialPinhao);
    var materialCoroa = Number(localStorage.materialCoroa);
    var HB1 = Number(localStorage.HB1);
    var HB2 = Number(localStorage.HB2);
    var St1 = Number(localStorage.St1);
    var St2 = Number(localStorage.St2);
    var 𝜱nw = document.getElementById('𝜱nw');

    // Verificando quantas variáveis o usuário digitou
    var lista = [F1,F2,ko1,N,Lh,FS,St1,St2]; //ok
    var cont = 0; //ok

    // encontrar quantas variáveis foram preenchidas
    for (j = 0; j < lista.length; j++) {
        if (lista[j] > 0) {
            cont++;
        }
    } 

    var varPreenchida = cont; //ok
    
    if (varPreenchida < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Caro usuário, preencha todos os parâmetros!',
        })
    }
    else {
        document.getElementById("Calcular").disabled = true; //ok
        var resultados = document.querySelector('.resultados'); //ok
        resultados.style.display = 'block'; //ok
        document.getElementById("S1").readOnly = 'true';
        document.getElementById("ConfParameter-pitting").disabled = false; //ok
        document.getElementById("F1").disabled = true; //ok
        document.getElementById("F2").disabled = true; //ok
        document.getElementById("Qv").disabled = true; //ok
        document.getElementById("𝜱nw").disabled = true; //ok
        document.getElementById("perfilEngrenamento").disabled = true; //ok
        document.getElementById("condicaoEngrenamento").disabled = true; //ok
        document.getElementById("AjusteEngrenamento").disabled = true; //ok
        document.getElementById("S1").disabled = true; //ok
        document.getElementById("do-1").disabled = true; //ok
        document.getElementById("do-2").disabled = true; //ok
        document.getElementById("N").disabled = true; //ok
        document.getElementById("L").disabled = true; //ok
        document.getElementById("S-f").disabled = true; //ok
        document.getElementById("N-ciclos").disabled = true; //ok
        document.getElementById("T-vida").disabled = true; //ok
        document.getElementById("S-F").disabled = true; //ok
        document.getElementById("Kr").disabled = true; //ok
        document.getElementById("Materiale").disabled = true; //ok
        document.getElementById('K01').disabled = true;
        document.getElementById('K02').disabled = true;
        document.getElementById('K03').disabled = true;
        document.getElementById('K04').disabled = true;
        document.getElementById('K05').disabled = true;
        document.getElementById('K06').disabled = true;
        document.getElementById('K07').disabled = true;
        document.getElementById('K08').disabled = true;
        document.getElementById('K09').disabled = true;

        // buscando do localStorage
        var wt = Number(localStorage.wt); //ok

        var z1 = Number(localStorage.z1); //ok
        var z2 = Number(localStorage.z2); //ok

        var x1 = Number(localStorage.x1); //ok
        var x2 = Number(localStorage.x2); //ok

        var v1 = Number(localStorage.v1); //ok
        var v2 = Number(localStorage.v2); //ok

        var n1 = Number(localStorage.n1); //ok
        var n2 = Number(localStorage.n2); //ok

        var i = Number(localStorage.i); //ok
        var pd_t = Number(localStorage.pd_t); //ok
        var pd_n = Number(localStorage.pd_n); //ok
        var phi_n_Radianos = Number(localStorage.phi_n_Radianos); //ok
        var psiRadianos = Number(localStorage.psiRadianos); //ok
        var phi_t_Radianos = Number(localStorage.phi_t_Radianos); //ok
        var phi_n = Number(localStorage.phi_n); //ok
        var phi_t = Number(localStorage.phi_t); //ok
        var ka = Number(localStorage.ka); //ok

        var px = Number(localStorage.px); //ok

        var pbn = Number(localStorage.pbn); //ok
        var pbt = Number(localStorage.pbt); //ok
        var pbx = Number(localStorage.pbx); //ok

        var d1 = Number(localStorage.d1); //ok
        var d2 = Number(localStorage.d2); //ok

        var de1 = Number(localStorage.de1); //ok
        var de2 = Number(localStorage.de2); //ok

        var dr1 = Number(localStorage.dr1); //ok
        var dr2 = Number(localStorage.dr2); //ok

        var ht1 = Number(localStorage.ht1); //ok
        var ht2 = Number(localStorage.ht2); //ok

        var db1 = Number(localStorage.db1); //ok
        var db2 = Number(localStorage.db2); //ok

        // fator de sobrecarga - ko
        var ko2 = ko1; //ok
        var ko = [ko1, ko2]; //ok

        // fator dinâmico - kv
        var B = 0.25*(12 - Qv)**(2/3); //ok
        var A = 50 + 56*(1 - B); //ok para  5 =< Qv =< 11 
        var Vt_max = [A + (Qv - 3)]**2; //ok
        var v = [v1, v2]; //ok
        var kv = []; //ok

        for (let i = 0; i < 2; i++) {
            if (v[i] < Vt_max) {
                kv[i] = ((A + Math.sqrt(v[i]))/A)**B; //ok
            }
            else {
                var fatordinamico = confirm('A velocidade da engrenagem é superior à recomendada para qualidade do engrenamento! Você ainda deseja calcular o fator dinâmico?');

                if (fatordinamico == true) {
                    kv[i] = ((A + Math.sqrt(v[i]))/A)**B; //ok
                }
                else {
                    kv[i] = 0; //ok
                }
            }
        }
        var kv1 = kv[0];
        var kv2 = kv[1];

        // fator de tamanho - ks
        var ks1 = 1; //ok
        var ks2 = ks1; //ok
        var ks = [ks1, ks2]; //ok

        // fator de distribuição de carga - km
            // km = f(Cmf, Cmt) - Cmf > fator de distribuição de carga de face | Cmt > fator de distribuição de carga transversal >>> km = Cmf - Método empírico
                // fator de contato de carga - K
                var Cpm = [], K = [], F_10d = [], Cpf = [], Cma = [], km = []; //ok
                var Cg = i/(i + 1); //ok
                var d = [d1, d2]; //ok
                var s2 = 0; //ok
                var S1 = [s1, s2]; //ok
                var F = [F1, F2]; //ok

                
                for (let i = 0; i < 2; i++) {
                    // fator modificador de proporção do pinhão
                    if (S1[i] < 0.175) {
                        Cpm[i] = 1; //ok
                    }
                    else {
                        Cpm[i] = 1.1; //ok
                    }

                    K[i] = (wt/(d[i]*F[i]))*(1/Cg); //ok

                    if ((F[i]/d[i]) <= 2 && F[i] <= 40) {
                        F_10d[i] = F[i]/(10*d[i]); //ok
                        
                        if (F_10d[i] < 0.05) {
                            F_10d[i] = 0.05; //ok
                        }
        
                        // fator de proporção do pinhão
                        if (F[i] <= 1) {
                            Cpf[i] = F_10d[i] - 0.025; //ok
                        }
                        else if (F[i] > 1 && F[i] <= 17) {
                            Cpf[i] = F_10d[i] - 0.0375 + 0.0125*F[i]; //ok
                        }
                        else {
                            Cpf[i] = F_10d[i] - 0.1109 + 0.0207*F[i] - 0.000228*F[i]**2; //ok 
                        }

                        if (condicaoEngrenamento == 1) {
                            var A = 0.247; //ok
                            var B = 0.0167; //ok
                            var C = -0.765e-4; //ok
                        }
                        else if (condicaoEngrenamento == 2) {
                            var A = 0.127; //ok
                            var B = 0.0158; //ok
                            var C = -0.093e-4; //ok
                        }
                        else if (condicaoEngrenamento == 3) {
                            var A = 0.0675; //ok
                            var B = 0.0128; //ok
                            var C = -0.926e-4; //ok
                        }
                        else {
                            var A = 0.0036; //ok
                            var B = 0.0102; //ok
                            var C = -0.822e-4; //ok
                        }
        
                        Cma[i] = A + B*F[i] + C*F[i]**2; //ok
                        km[i] = 1 + Cmc*(Cpf[i]*Cpm[i] + Cma[i]*Ce); //ok
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Caro usuário, as hipóteses: F/d <= 2 e/ou F <= 40 in, não foram atendidas! O fator de distribuição de carga não pode ser calculado com exatidão.',
                        })
                    }
                }
                
            //
        //
        
        var km1 = km[0];
        var km2 = km[1];

        /*
        var km1 = 1.61;
        var km2 = 1.61;
        */

        var km = [km1, km2];

        // fator de espessura de borda - kb
        var tr = [], mb = [], kb = []; //ok
        var dr = [dr1, dr2]; //ok
        var ht = [ht1, ht2]; //ok

        var deixo = [deixo1, deixo2]; //ok

        for (let i = 0; i < 2; i++) {
            tr[i] = dr[i] - deixo[i]; //ok
            mb[i] = tr[i]/ht[i]; //ok

            if (mb[i] < 1.2) {
                kb[i] = 1.6*Math.log(2.242/mb[i]);
            }
            else {
                kb[i] = 1;
            }
        }

        // fator geométrico - J
        // geometria básica das engrenagens
        var pdn = 1;
        var 𝜱n = phi_n_Radianos;
        var ψ = psiRadianos;
        var 𝜱 = Math.atan(Math.tan(𝜱n)/Math.cos(ψ));

        // convert deg to rad
        var deg_rad = Math.PI/180;
        var rad_deg = 180/Math.PI;
        
        if (ψ == 0) {
            F = 0;
        }
        else {
            px = Math.PI/Math.sin(ψ);
            F = px;
        }

        // Pinion
        var R1 = z1/(2*pdn*Math.cos(ψ)); 
        var Ro1 = R1 + (ka + x1)/pdn; 

        // Gear
        var x2 = -x1;
        var R2 = z2/(2*pdn*Math.cos(ψ)); 
        var Ro2 = R2 + (ka + x2)/pdn; 

        // Tool of pinion and gear
        var nc1 = 10000;
        var xo1 = 0;
        var Δao1 = 0.0061;
        var Δsn1 = 0.0240;

        var nc2 = 10000;
        var xo2 = 0;
        var Δao2 = 0.0061;
        var Δsn2 = 0.0240;

        if (ψ == 0) {
            // ECDR
            h_ao1 = 1.3;
            h_ao2 = 1.3;

            if (𝜱n == 14.5*deg_rad || 𝜱 == 14.5*deg_rad) {
                h_ao1 = 1.15;
                h_ao2 = 1.15;
                ρ_ao1 = 0.157;
                ρ_ao2 = 0.157;
            }
            else if (𝜱n == 20*deg_rad || 𝜱 == 20*deg_rad) {
                ρ_ao1 = 0.250;
                ρ_ao2 = 0.250;
            }
            else if (𝜱n == 25*deg_rad || 𝜱 == 25*deg_rad) {
                ρ_ao1 = 0.270;
                ρ_ao2 = 0.270;
            }
        }
        else {
            // ECDH

            if (𝜱n == 14.5*deg_rad || 𝜱 == 14.5*deg_rad) {
                h_ao1 = 1.15;
                h_ao2 = 1.15;
                ρ_ao1 = 0.157;
                ρ_ao2 = 0.157;
            }
            else if (𝜱n == 20*deg_rad || 𝜱 == 20*deg_rad) {
                h_ao1 = 1.20; 
                h_ao2 = 1.20;
                ρ_ao1 = 0.250;
                ρ_ao2 = 0.250;
            }
            else if (𝜱n == 25*deg_rad || 𝜱 == 25*deg_rad) {
                h_ao1 = 1.3;
                h_ao2 = 1.3;
                ρ_ao1 = 0.270;
                ρ_ao2 = 0.270;
            }           
        }

        // Distance of center
        var Cr = R1 + R2;

        // Fase G2
    
            // Normalize to Pn = 1
            var Cr = Cr*pdn;
            var F = F*pdn;
            var Ro1 = Ro1*pdn;
            var Ro2 = Ro2*pdn;
        
            // Basic Geometry
            var mg = z2/z1;
            var R1 = z1/(2*Math.cos(ψ));
            var R2 = mg*R1;
            var 𝜱 = Math.atan(Math.tan(𝜱n)/Math.cos(ψ));
            var Rb1 = R1*Math.cos(𝜱);
            var Rb2 = mg*Rb1;
            var 𝜱r = Math.acos((Rb1 + Rb2)/Cr);
            var pb = 2*Math.PI*Rb1/z1;
            var pn = Math.PI*Math.cos(𝜱n);
            var ψb = Math.acos(pn/pb);
            var C6 = Cr*Math.sin(𝜱r);
            var C1 = C6 - (Ro2**2 - Rb2**2)**0.5;
            var C3 = C6/(mg + 1);
            var C4 = C1 + pb;
            var C5 = (Ro1**2 - Rb1**2)**0.5;
            var C2 = C5 - pb;
            var Z = C5 - C1;
            var mp = Z/pb;

        // Fase G3
            var nr = mp - 1;
        
            if (ψ == 0) {
                // ECDR
                var mf = 0;
                var mN = 1;
                var Lmin = F;
            }
            else {
                // ECDH
                var mf = F/px;
            
                if (mf <= 1) {
                    // LACR
                    var mN = 1;
                }
                else {
                    // HELICAL GEARS (CONVENTIONAL)
                    var na = mf - 1;
            
                    if ((1 - nr) >= na) {
                        // CASE I
                        var Lmin = (mp*F - na*nr*px)/Math.cos(ψb);
                    }
                    else {
                        // CASE II
                        var Lmin = (mp*F - (1 - na)*(1 - nr)*px)/Math.cos(ψb);
                    }

                    // Fase G4
                    var mN = F/Lmin;
                }
            }

        // Fase G5
            var ψr = Math.atan(Math.tan(ψb)/Math.cos(𝜱r));
            var 𝜱nr = Math.asin(Math.cos(ψb)*Math.sin(𝜱r));

        // I Factor subroutine
    
            var d = 2*Cr/(mg + 1);
            var Rm1 = 0.5*(Ro1 + (Cr - Ro2));
            
            if (mf <= 1) {
                // LACR
                var ρ1 = C2;
                var ρ2 = C6 - ρ1;
                var ρm1 = (Rm1**2 - Rb1**2)**0.5;
                var ρm2 = C6 - ρm1;
                var Cψ = (1 - mf*(1 - ρm1*ρm2*Z/(ρ1*ρ2*pn)))**0.5;
            }
            else {
                // HELICAL GEARS (CONVENTIONAL)
                var ρ1 = (Rm1**2 - Rb1**2)**0.5;
                var ρ2 = C6 - ρ1;
                var Cψ = 1;
            }
            
            var I = Math.cos(𝜱r)*Cψ**2/((1/ρ1 + 1/ρ2)*d*mN); 

        // Fase G6
            J = [];
            
            // GearSet
                if (ψ == 0) {
                    var F = 0;
                }
                else {
                    var px = Math.PI/Math.sin(ψ);
                    if (𝜱n == 14.5*deg_rad || 𝜱 == 14.5*deg_rad) {
                        var F = 2*px;
                    }
                    else if (𝜱n == 20*deg_rad || 𝜱 == 20*deg_rad) {
                        var F = 1.005*px;
                    }
                    else if (𝜱n == 25*deg_rad || 𝜱 == 25*deg_rad) {
                        var F = 1.005*px;
                    }
                }

        // Fase G2

            // Normalize to Pn = 1
                var F = F*pdn;

        // Fase G3
        
            if (ψ == 0) {
                // ECDR
                var mf = 0;
                var mN = 1;
                var Lmin = F;
            }
            else {
                // ECDH
                var mf = F/px;
            
                if (mf <= 1) {
                    // LACR
                    var mN = 1;
                }
                else {
                    // HELICAL GEARS (CONVENTIONAL)
                    var na = mf - 1;
            
                    if ((1 - nr) >= na) {
                        // CASE I
                        var Lmin = (mp*F - na*nr*px)/Math.cos(ψb);
                    }
                    else {
                        // CASE II
                        var Lmin = (mp*F - (1 - na)*(1 - nr)*px)/Math.cos(ψb);
                    }

                    // Fase G4
                    var mN = F/Lmin;
                }
            }

        // I Factor subroutine

            var d = 2*Cr/(mg + 1);
            var Rm1 = 0.5*(Ro1 + (Cr - Ro2));
            
            if (mf <= 1) {
                // LACR
                var ρ1 = C2;
                var ρ2 = C6 - ρ1;
                var ρm1 = (Rm1**2 - Rb1**2)**0.5;
                var ρm2 = C6 - ρm1;
                var Cψ = (1 - mf*(1 - ρm1*ρm2*Z/(ρ1*ρ2*pn)))**0.5;
            }
            else {
                // HELICAL GEARS (CONVENTIONAL)
                var ρ1 = (Rm1**2 - Rb1**2)**0.5;
                var ρ2 = C6 - ρ1;
                var Cψ = 1;
            }

        for (i = 0; i < 2; i++) {

            if (i == 0) {
                var z1 = z1;
                var Ro1 = Ro1;
                var R1 = R1;
                var Rb1 = Rb1;
                var C4 = C4;
                var x = x1;
                var ΔSn = Δsn1;
                var nc = nc1;
                var h_ao = h_ao1;
                var xo = xo1;
                var ρ_ao = ρ_ao1;
                var Δao = Δao1;
            }
            else if (i == 1) {
                // Return
                var To1 = Ro1;
                var T1 = R1;
                var mg = z1/z2;
                
                var z1 = z2;
                var Ro1 = Ro2;
                var Ro2 = To1;
                var R1 = R2;
                var R2 = T1;
                var Rb1 = Rb2;
                var C4 = C6 - C2;
                var x = x2;
                var ΔSn = Δsn2;
                var nc = nc2;
                var h_ao = h_ao2;
                var xo = xo2;
                var ρ_ao = ρ_ao2;
                var Δao = Δao2;
            }

            // J Factor subroutine
        
                // Fase J1
                    if (ψ == 0) {
                        // ECDR
                        var z = z1;
                        var rn = R1;
                        var rnb = Rb1;
                    
                        if (𝜱nw.checked) {
                            // HPSTC           
                            var tan_𝜱nw = C4/rnb;                           
                        }
                        else {
                            // TIP
                            var rna = rn + Ro1 - R1;
                            var tan_𝜱nw = ((rna/rnb)**2 - 1)**0.5;
                        }

                    }
                    else {
                        // ECDH
                        var z = z1/Math.cos(ψ)**3;
                        var rn = z/2;
                        var rnb = rn*Math.cos(𝜱n);
                    
                        if (mf <= 1) {
                            // LACR
                            var rn2 = mg*rn;
                            var rnb2 = mg*rnb;
                            var rna2 = rn2 + Ro2 - R2;
                            var Cn6 = (rnb2 + rnb)*Math.tan(𝜱nr);
                            var Cn1 = Cn6 - (rna2**2 - rnb2**2)**0.5;
                            var Cn4 = Cn1 + pn;
                            var tan_𝜱nw = Cn4/rnb;
                        }
                        else {
                            // HELICAL GEARS (CONVENTIONAL)
                    
                            // Fase J3
                            var rna = rn + Ro1 - R1;
                            var tan_𝜱nw= ((rna/rnb)**2 - 1)**0.5;
                        }

                    }

            // Fase J5
                var xg = x - ΔSn/(2*Math.tan(𝜱n));
                var Sn = 0.5*Math.PI + 2*xg*Math.tan(𝜱n);
                var inv_𝜱n = Math.tan(𝜱n) - 𝜱n;
                var 𝜱nL = tan_𝜱nw - Math.tan(𝜱n) + 𝜱n - Sn/z;
                var rnL = rnb/Math.cos(𝜱nL);
        
                // Virtual shaper cutter geometry
                    var no = nc/Math.cos(ψ)**3;
                    var rno = no/2;
                    var rnbo = rno*Math.cos(𝜱n);
                    var rno_s = rno + h_ao + xo - ρ_ao;
                    var 𝜱ns = Math.acos(rnbo/rno_s);
                    var inv_𝜱ns = Math.tan(𝜱ns) - 𝜱ns;
                    var Sno = 0.5*Math.PI + 2*xo*Math.tan(𝜱n);
                    var inv_𝜱npo = Math.tan(𝜱n) - 𝜱n + Sno/no;
                    var λns = inv_𝜱npo - inv_𝜱ns + (Δao - ρ_ao)/rnbo;
                    var inv_𝜱n_ll = inv_𝜱n + 2*(xg + xo)*Math.tan(𝜱n)/(z + no);
                
                    var 𝜱ni_ll = [0, (3*inv_𝜱n_ll)**0.33];
                    var to = 1;

            // Fase J6
                while (Math.abs(𝜱ni_ll[to] - 𝜱ni_ll[to-1]) > 1e-6) {
                    var to = to + 1;
                    𝜱ni_ll[to] = 𝜱ni_ll[to-1] + (inv_𝜱n_ll + 𝜱ni_ll[to-1] - Math.tan(𝜱ni_ll[to-1]))/Math.tan(𝜱ni_ll[to-1])**2;
                }

            // Fase J7
                var rn_ll = rn*Math.cos(𝜱n)/Math.cos(𝜱ni_ll[𝜱ni_ll.length - 1]);
                var rno_ll = rno*Math.cos(𝜱n)/Math.cos(𝜱ni_ll[𝜱ni_ll.length - 1]);
                
                var y = [0, 1];
                var αn = [Math.PI/4];
                var to = 1;

                // Zerando as variáveis
                    μno = []; Ks = []; Kf = []; θno = [];
                    θn = []; βn = []; ξnF = []; ηnF = []; 
                    hF = []; y_l = [];

            // Fase J8
                while (Math.abs(y[to] - y[to-1]) > 1e-6) {

                    μno[to-1] = Math.acos(rno_ll*Math.cos(αn[to-1])/rno_s) - αn[to-1];
                
                    Ks[to-1] = rno_ll*Math.sin(αn[to-1]) - rno_s*Math.sin(αn[to-1] + μno[to-1]);
                    Kf[to-1] = Ks[to-1] - ρ_ao;
                
                    θno[to-1] = μno[to-1] - λns + Math.PI/no;
                    θn[to-1] = (no/z)*θno[to-1];
                
                    βn[to-1] = αn[to-1] - θn[to-1];
                
                    ξnF[to-1] = rn_ll*Math.sin(θn[to-1]) + Kf[to-1]*Math.cos(βn[to-1]);
                    ηnF[to-1] = rn_ll*Math.cos(θn[to-1]) + Kf[to-1]*Math.sin(βn[to-1]);
                
                    hF[to-1] = rnL - ηnF[to-1];
                
                    y[to+1] = 2*hF[to-1]*Math.tan(βn[to-1]) - ξnF[to-1];
                
                    y_l[to-1] = 2*hF[to-1]/(Math.cos(βn[to-1]))**2 - Kf[to-1]*Math.sin(βn[to-1]) + (no/z)*[rno_ll*Math.sin(αn[to-1])/(rno_s*Math.sin(αn[to-1] + μno[to-1])) - 1]*[2*ξnF[to-1]*Math.tan(βn[to-1]) - ηnF[to-1] - 2*hF[to-1]/(Math.cos(βn[to-1]))**2] - rno_ll*[Math.cos(αn[to-1]) - Math.sin(αn[to-1])/Math.tan(αn[to-1] + μno[to-1])]*[(1 + (Math.sin(βn[to-1]))**2)/Math.cos(βn[to-1])];
            
                    αn[to] = αn[to - 1] - y[to+1]/y_l[to-1];
            
                    to = to + 1;
                }
                
            // Fase J9
        
                var ρF = ρ_ao + (rno_ll - rno_s)**2/(rn_ll*rno_ll/(rn_ll + rno_ll) - (rno_ll - rno_s));
                var ω = Math.atan(Math.tan(ψ)*Math.sin(𝜱n));
                var ω = rad_deg*ω;
                var SF = 2*ξnF[ξnF.length-1];
                var H = 0.331 - 0.436*𝜱n;
                var L = 0.324 - 0.492*𝜱n;
                var M = 0.261 + 0.545*𝜱n;
                var KF = H + ((SF/ρF)**L)*(SF/hF[hF.length-1])**M;

                if (mf <= 1) {
                    // LACR
                    var Ch = 1;
                    var Kψ = 1;
                }
                else {
                    // HELICAL GEARS (CONVENTIONAL)
                    var Ch = 1/(1 - ((ω/100)*(1 - ω/100))**0.5);
                    var Kψ = Math.cos(ψr)*Math.cos(ψ);
                }

            // Fase J10
            var Y = Kψ/((Math.cos(𝜱nL)/Math.cos(𝜱nr))*[6*hF[hF.length-1]/((SF**2)*Ch) - Math.tan(𝜱nL)/SF]);
            J[i] = Y*Cψ/(KF*mN);
            document.getElementById('j-'+(i+1)).value = J[i].toFixed(2);
        } 

        // Tensão de flexão nas engrenagens
        var σf = [],  St = [St1, St2];

        for (let i = 0; i < 2; i++) {
            σf[i] = wt*ko[i]*kv[i]*ks[i]*(pd_t/Math.min(F1,F2))*(km[i]*kb[i]/J[i]);

            if (σf[i] > 1e4) {
                window.document.getElementById('σ-'+(i+1)).value = σf[i].toFixed(0);
            }
            else {
                window.document.getElementById('σ-'+(i+1)).value = σf[i].toFixed(1); //ok
            }

            if (St[i] > 1e4) {
                window.document.getElementById('St-'+(i+1)).value = St[i].toFixed(0);
            }
            else {
                window.document.getElementById('St-'+(i+1)).value = St[i].toFixed(1); //ok
            }
        }
        
        // Resistência - flexão
        // fator de Temperatura
        var kt1 = 1; //ok
        var kt2 = kt1; //ok
        var kt = [kt1, kt2]; //ok

        // fator de confiabilidade
        var kr1 = Number(document.getElementById('Kr').value); //ok
        var kr2 = kr1; //ok
        var kr = [kr1, kr2]; //ok

        // Número de ciclos e tempo de vida útil
        var HB = [HB1, HB2], n = [n1, n2];

        if (FS !== 0) {
            var Yn = [], N = [], Lh = [];

            for (let i = 0; i < 2; i++) {
                Yn[i] = σf[i]*FS*kt[i]*kr[i]/St[i];
    
                if (Yn[i] >=1.04) {
                    if (HB[i] >= 160 && HB[i] < 210) {
                        N[i] = (2.3194/Yn[i])**(5000/269);
                    }
                    else if (HB[i] >= 210 && HB[i] < 250) {
                        N[i] = (3.517/Yn[i])**(10000/817);
                    }
                    else if (HB[i] >= 250 && HB[i] < 300) {
                        N[i] = (4.904/Yn[i])**(2000/209);
                    }
                    else if (HB[i] >= 300 && HB[i] < 400) {
                        N[i] = (6.1514/Yn[i])**(1250/149);
                    }
                    else if (HB[i] >= 400) {
                        N[i] = (9.4518/Yn[i])**(250/37);
                    }
    
                    if (N[i] <= 1e3) {
                        N[i] = 1e3;
                    }
                }
                else {
                    N[i] = (1.6831/Yn[i])**(10000/323); // opção mais conservadora
                    N[i] = (1.3558/Yn[i])**(5000/89); // opção menos conservadora
    
                    if (N[i] > 1e10) {
                        N[i] = 1e10;
                    }
                }
    
                Lh[i] = N[i]/(60*n[i]);

                document.querySelector('.Lh-'+(i+1)).style.display = 'block';

                if (Lh[i] > 1e4) {
                    window.document.getElementById('lh-'+(i+1)).value = Lh[i].toFixed(0);
                }
                else {
                    window.document.getElementById('lh-'+(i+1)).value = Lh[i].toFixed(2); //ok
                }
            }

            document.getElementById('Pinhao').textContent = 'Tensão de flexão e tempo de vida';
            document.getElementById('Coroa').textContent = 'Tensão de flexão e tempo de vida';
        }
        else {
            if (N !== 0) {
                var Yn = [], Lh = [], FS = [];

                for (let i = 0; i < 2; i++) {
                    Lh[i] = N/(60*n[i]);
    
                    if (N >= 1e2 && N <= 1e3) {
                        if (HB[i] >= 160 && HB[i] < 210) {
                            Yn[i] = 2.3194*1e3**(-0.0538);
                        }
                        else if (HB[i] >= 210 && HB[i] < 250) {
                            Yn[i] = 3.157*1e3**(-0.0817);
                        }
                        else if (HB[i] >= 250 && HB[i] < 300) {
                            Yn[i] = 4.9404*1e3**(-0.1045);
                        }
                        else if (HB[i] >= 300 && HB[i] < 400) {
                            Yn[i] = 6.1514*1e3**(-0.1192);
                        }
                        else if (HB[i] >= 400) {
                            Yn[i] = 9.4518*1e3**(-0.148);
                        }
                    }
                    else if (N > 1e3 && N <= 3e6) {
                        if (HB[i] >= 160 && HB[i] < 210) {
                            Yn[i] = 2.3194*N**(-0.0538);
                        }
                        else if (HB[i] >= 210 && HB[i] < 250) {
                            Yn[i] = 3.157*N**(-0.0817);
                        }
                        else if (HB[i] >= 250 && HB[i] < 300) {
                            Yn[i] = 4.9404*N**(-0.1045);
                        }
                        else if (HB[i] >= 300 && HB[i] < 400) {
                            Yn[i] = 6.1514*N**(-0.1192);
                        }
                        else if (HB[i] >= 400) {
                            Yn[i] = 9.4518*N**(-0.148);
                        }
                    }
                    else if (N > 3e6 && N <= 1e10) {
                        //Yn[i] = 1.6831*N**(-0.0323); // opção mais conservadora
                        Yn[i] = 1.3558*N**(-0.0178); // opção menos conservadora
                    }
                    else if (N > 1e10) {
                        //Yn[i] = 1.6831*1e10**(-0.0323); // opção mais conservadora
                        Yn[i] = 1.3558*1e10**(-0.0178); // opção menos conservadora
                    }
    
                    FS[i] = St[i]*Yn[i]/(σf[i]*kt[i]*kr[i]);

                    document.querySelector('.SF-'+(i+1)).style.display = 'block';

                    window.document.getElementById('sf-'+(i+1)).value = FS[i].toFixed(2); //ok
                }

                document.getElementById('Pinhao').textContent = 'Tensão de flexão e fator de segurança';
                document.getElementById('Coroa').textContent = 'Tensão de flexão e fator de segurança';
            }
            else {
                var Yn = [], N = [], FS = [];
                for (let i = 0; i < 2; i++) {
                    N[i] = 60*n[i]*Lh;
    
                    if (N[i] >= 1e2 && N[i] <= 1e3) {
                        if (HB[i] >= 160 && HB[i] < 210) {
                            Yn[i] = 2.3194*1e3**(-0.0538);
                        }
                        else if (HB[i] >= 210 && HB[i] < 250) {
                            Yn[i] = 3.157*1e3**(-0.0817);
                        }
                        else if (HB[i] >= 250 && HB[i] < 300) {
                            Yn[i] = 4.9404*1e3**(-0.1045);
                        }
                        else if (HB[i] >= 300 && HB[i] < 400) {
                            Yn[i] = 6.1514*1e3**(-0.1192);
                        }
                        else if (HB[i] >= 400) {
                            Yn[i] = 9.4518*1e3**(-0.148);
                        }
                    }
                    else if (N[i] > 1e3 && N[i] <= 3e6) {
                        if (HB[i] >= 160 && HB[i] < 210) {
                            Yn[i] = 2.3194*N[i]**(-0.0538);
                        }
                        else if (HB[i] >= 210 && HB[i] < 250) {
                            Yn[i] = 3.157*N[i]**(-0.0817);
                        }
                        else if (HB[i] >= 250 && HB[i] < 300) {
                            Yn[i] = 4.9404*N[i]**(-0.1045);
                        }
                        else if (HB[i] >= 300 && HB[i] < 400) {
                            Yn[i] = 6.1514*N[i]**(-0.1192);
                        }
                        else if (HB[i] >= 400) {
                            Yn[i] = 9.4518*N[i]**(-0.148);
                        }
                    }
                    else if (N[i] > 3e6 && N[i] <= 1e10) {
                        //Yn[i] = 1.6831*N[i]**(-0.0323); // opção mais conservadora
                        Yn[i] = 1.3558*N[i]**(-0.0178); // opção menos conservadora
                    }
                    else if (N[i] > 1e10) {
                        //Yn[i] = 1.6831*1e10**(-0.0323); // opção mais conservadora
                        Yn[i] = 1.3558*1e10**(-0.0178); // opção menos conservadora
                    }
    
                    FS[i] = St[i]*Yn[i]/(σf[i]*kt[i]*kr[i]);

                    document.querySelector('.SF-'+(i+1)).style.display = 'block';

                    window.document.getElementById('sf-'+(i+1)).value = FS[i].toFixed(2); //ok
                }
                
                document.getElementById('Pinhao').textContent = 'Tensão de flexão e fator de segurança';
                document.getElementById('Coroa').textContent = 'Tensão de flexão e fator de segurança';
            }
        }

        var σadm = [];

        for (let i = 0; i < 2; i++) {
            σadm[i] = St[i]*Yn[i]/(kt[i]*kr[i]);

            if (σadm[i] > 1e4) {
                window.document.getElementById('σadm-'+(i+1)).value = σadm[i].toFixed(0);
            }
            else {
                window.document.getElementById('σadm-'+(i+1)).value = σadm[i].toFixed(1); //ok
            }
        }

        // Mostrar a análise de tensões

        window.document.getElementById('ko-1').value = ko[0].toFixed(2); //ok
        window.document.getElementById('ko-2').value = ko[1].toFixed(2); //ok

        window.document.getElementById('kv-1').value = kv[0].toFixed(2); //ok
        window.document.getElementById('kv-2').value = kv[1].toFixed(2); //ok

        window.document.getElementById('ks-1').value = ks[0].toFixed(2); //ok
        window.document.getElementById('ks-2').value = ks[1].toFixed(2); //ok

        window.document.getElementById('km-1').value = km[0].toFixed(2); //ok
        window.document.getElementById('km-2').value = km[1].toFixed(2); //ok

        window.document.getElementById('kb-1').value = kb[0].toFixed(2); //ok
        window.document.getElementById('kb-2').value = kb[1].toFixed(2); //ok

        window.document.getElementById('j-1').value = J[0].toFixed(2); //ok
        window.document.getElementById('j-2').value = J[1].toFixed(2); //ok

        window.document.getElementById('kt-1').value = kt[0].toFixed(2); //ok
        window.document.getElementById('kt-2').value = kt[1].toFixed(2); //ok

        window.document.getElementById('kr-1').value = kr[0].toFixed(2); //ok
        window.document.getElementById('kr-2').value = kr[1].toFixed(2); //ok

        window.document.getElementById('Yn-1').value = Yn[0].toFixed(2); //ok
        window.document.getElementById('Yn-2').value = Yn[1].toFixed(2); //ok

        // salvando no localStorage
        localStorage.ko1 = ko1;
        localStorage.ko2 = ko2;

        localStorage.kv1 = kv1;
        localStorage.kv2 = kv2;

        localStorage.ks1 = ks1;
        localStorage.ks2 = ks2;

        localStorage.km1 = km1;
        localStorage.km2 = km2;

        localStorage.F1 = F1;
        localStorage.F2 = F2;

        localStorage.I = I;
        localStorage.mg = mg;
    }
}

function AnaliseTensoesContato() {
    // analise de tensões de contato
    // parâmetros de entrada
    var E1 = Number(document.getElementById('E1').value);
    var E2 = Number(document.getElementById('E2').value);
    var v1 = Number(document.getElementById('Poisson1').value);
    var v2 = Number(document.getElementById('Poisson2').value);
    var N = Number(document.getElementById('N-ciclos').value);
    var Lh = Number(document.getElementById('T-vida').value);
    var FS = Number(document.getElementById('S-F').value);

    // Verificando quantas variáveis o usuário digitou
    var lista = [E1,E2,v1,v2,N,Lh,FS]; //ok
    var cont = 0; //ok

    // encontrar quantas variáveis foram preenchidas
    for (j = 0; j < lista.length; j++) {
        if (lista[j] > 0) {
            cont++;
        }
    } 

    var varPreenchida = cont; //ok
    
    if (varPreenchida < 5) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Caro usuário, preencha todos os parâmetros!',
        })
    }
    else {
        document.getElementById("Calcular").disabled = true; //ok
        var resultados = document.querySelector('.resultados'); //ok
        resultados.style.display = 'block'; //ok
        document.getElementById("E1").disabled = true; //ok
        document.getElementById("E2").disabled = true; //ok
        document.getElementById("Poisson1").disabled = true; //ok
        document.getElementById("Poisson2").disabled = true; //ok
        document.getElementById("N").disabled = true; //ok
        document.getElementById("L").disabled = true; //ok
        document.getElementById("S-f").disabled = true; //ok
        document.getElementById("N-ciclos").disabled = true; //ok
        document.getElementById("T-vida").disabled = true; //ok
        document.getElementById("S-F").disabled = true; //ok
        document.getElementById("Kr").disabled = true; //ok

        // buscando do localStorage
        var d1 = Number(localStorage.d1);
        var d2 = Number(localStorage.d2);

        var wt = Number(localStorage.wt); //ok

        var ko1 = Number(localStorage.ko1);
        var ko2 = Number(localStorage.ko2);

        var kv1 = Number(localStorage.kv1);
        var kv2 = Number(localStorage.kv2);

        var ks1 = Number(localStorage.ks1);
        var ks2 = Number(localStorage.ks2);

        var km1 = Number(localStorage.km1);
        var km2 = Number(localStorage.km2);

        var F1 = Number(localStorage.F1);
        var F2 = Number(localStorage.F2);

        var n1 = Number(localStorage.n1);
        var n2 = Number(localStorage.n2);

        var HB1 = Number(localStorage.HB1);
        var HB2 = Number(localStorage.HB2);

        var I = Number(localStorage.I);
        var mg = Number(localStorage.mg);

        var Sc1 = Number(localStorage.Sc1);
        var Sc2 = Number(localStorage.Sc2);

        var Tt1 = localStorage.Tt1;
        var Tt2 = localStorage.Tt2;

        var d = [d1, d2], ko = [ko1, ko2], kv = [kv1, kv2], ks = [ks1, ks2], km = [km1, km2], F = [F1, F2], n = [n1, n2], HB = [HB1, HB2], Sc = [Sc1, Sc2], Tt = [Tt1, Tt2];

        // Tensão de Contato
        // Coeficiente elástico
        var Cp = (1/(Math.PI*((1 - v1**2)/E1 + (1 - v2**2)/E2)))**0.5;

        // Fator de condição de superfície
        var Cf = 1;

        // Tensão de Contato nas engrenagens
        var σc = [];

        for (let i = 0; i < 2; i++) {
            σc[i] = Cp*(wt*ko[i]*kv[i]*ks[i]*(km[i]/(Math.min(F1,F2)*d1))*(Cf/I))**0.5;

            if (σc[i] > 1e4) {
                window.document.getElementById('σc-'+(i+1)).value = σc[i].toFixed(0);
            }
            else {
                window.document.getElementById('σc-'+(i+1)).value = σc[i].toFixed(2); //ok
            }

            if (Sc[i] > 1e4) {
                window.document.getElementById('Sc-'+(i+1)).value = Sc[i].toFixed(0);
            }
            else {
                window.document.getElementById('Sc-'+(i+1)).value = Sc[i].toFixed(1); //ok
            }
        }

        // Resistência - flexão
        // fator de razão de dureza
        var CH = [];

        for (let i = 0; i < 2; i++) {
            if (i == 0) {
                CH[i] = 1;
            }
            else {
                if ((HB1/HB2) < 1.2) {
                    var A = 0;
                }
                else if ((HB1/HB2) >= 1.2 && (HB1/HB2) <= 1.7) {
                    var A = 8.98e-3*(HB1/HB2) - 8.29e-3;
                }
                else if ((HB1/HB2) > 1.7) {
                    var A = 6.98e-3;
                }
                CH[i] = 1 + A*(mg - 1);
            }

            window.document.getElementById('ch-'+(i+1)).value = CH[i].toFixed(2); //ok
        }

        // fator de Temperatura
        var kt1 = 1; //ok
        var kt2 = kt1; //ok
        var kt = [kt1, kt2]; //ok

        // fator de confiabilidade
        var kr1 = Number(document.getElementById('Kr').value); //ok
        var kr2 = kr1; //ok
        var kr = [kr1, kr2]; //ok

        if (FS !== 0) {
            var Zn = [], N = [], Lh = [];

            for (let i = 0; i < 2; i++) {
                Zn[i] = (σc[i]*FS*kt[i]*kr[i]/(Sc[i]*CH[i]));

                if (Zn[i] >= 1.09) {
                    if (Tt[i] === 'Nitretado') {
                        N[i] = (1.249/Zn[i])**(5000/69);
                    }
                    else {
                        N[i] = (2.466/Zn[i])**(125/7);
                    }

                    if (N[i] <= 1e4) {
                        N[i] = 1e4;
                    }
                }
                else {
                    N[i] = (1.4488/Zn[i])**(1000/23); //mais conservador
                    //N[i] = (2.466/Zn[i])**(125/7); // menos conservador

                    if (N[i] > 1e10) {
                        N[i] = 1e10;
                    }
                }
                Lh[i] = N[i]/(60*n[i]);

                document.querySelector('.Lh-'+(i+1)).style.display = 'block';

                if (Lh[i] > 1e4) {
                    window.document.getElementById('lh-'+(i+1)).value = Lh[i].toFixed(0);
                }
                else {
                    window.document.getElementById('lh-'+(i+1)).value = Lh[i].toFixed(2); //ok
                }
            }

            document.getElementById('Pinhao').textContent = 'Tensão de contato e tempo de vida';
            document.getElementById('Coroa').textContent = 'Tensão de contato e tempo de vida';
        }
        else {
            if (N !== 0) {
                var Zn = [], Lh = [], FS = [];

                for (let i = 0; i < 2; i++) {
                    Lh[i] = N/(60*n[i]);
    
                    if (N >= 1e2 && N <= 1e4) {
                        if (Tt[i] === 'Nitretado') {
                            Zn[i] = 1.249*1e4**(-0.0138);
                        }
                        else {
                            Zn[i] = 2.466*1e4**(-0.056);
                        }
                    }
                    else if (N > 1e4 && N <= 1e7) {
                        if (Tt[i] === 'Nitretado') {
                            Zn[i] = 1.249*N**(-0.0138);
                        }
                        else {
                            Zn[i] = 2.466*N**(-0.056);
                        }
                    }
                    else if (N > 1e7 && N <= 1e10) {
                        Zn[i] = 1.4488*N**(-0.023); // mais conservador
                        //Zn[i] = 2.466*N**(-0.056); // menos conservador
                    }
                    else if (N > 1e10) {
                        Zn[i] = 1.4488*1e10**(-0.023); // mais conservador
                        //Zn[i] = 2.466*1e10**(-0.056); // menos conservador
                    }
    
                    FS[i] = (Sc[i]*Zn[i]*CH[i]/(σc[i]*kt[i]*kr[i]))**2;


                    document.querySelector('.SF-'+(i+1)).style.display = 'block';

                    window.document.getElementById('sf-'+(i+1)).value = FS[i].toFixed(2); //ok
                }

                document.getElementById('Pinhao').textContent = 'Tensão de contato e fator de segurança';
                document.getElementById('Coroa').textContent = 'Tensão de contato e fator de segurança';
            }
            else {
                var Zn = [], N = [], FS = [];

                for (let i = 0; i < 2; i++) {
                    N[i] = 60*n[i]*Lh;

                    if (N[i] >= 1e2 && N[i] <= 1e4) {
                        if (Tt[i] === 'Nitretado') {
                            Zn[i] = 1.249*1e4**(-0.0138);
                        }
                        else {
                            Zn[i] = 2.466*1e4**(-0.056);
                        }
                    }
                    else if (N[i] > 1e4 && N[i] <= 1e7) {
                        if (Tt[i] === 'Nitretado') {
                            Zn[i] = 1.249*N[i]**(-0.0138);
                        }
                        else {
                            Zn[i] = 2.466*N[i]**(-0.056);
                        }
                    }
                    else if (N[i] > 1e7 && N[i] <= 1e10) {
                        Zn[i] = 1.4488*N[i]**(-0.023); // mais conservador
                        //Zn[i] = 2.466*N[i]**(-0.056); // menos conservador
                    }
                    else if (N[i] > 1e10) {
                        Zn[i] = 1.4488*1e10**(-0.023); // mais conservador
                        //Zn[i] = 2.466*1e10**(-0.056); // menos conservador
                    }
    
                    FS[i] = (Sc[i]*Zn[i]*CH[i]/(σc[i]*kt[i]*kr[i]))**1;

                    document.querySelector('.SF-'+(i+1)).style.display = 'block';

                    window.document.getElementById('sf-'+(i+1)).value = FS[i].toFixed(2); //ok
                }
                
                document.getElementById('Pinhao').textContent = 'Tensão de contato e fator de segurança';
                document.getElementById('Coroa').textContent = 'Tensão de contato e fator de segurança';
            }
        }

        var σadm = [];

        for (let i = 0; i < 2; i++) {
            σadm[i] = Sc[i]*Zn[i]*CH[i]/(kt[i]*kr[i]);

            if (σadm[i] > 1e4) {
                window.document.getElementById('σadm-'+(i+1)).value = σadm[i].toFixed(0);
            }
            else {
                window.document.getElementById('σadm-'+(i+1)).value = σadm[i].toFixed(1); //ok
            }
        }
        
        // Mostrar a análise de tensões
        window.document.getElementById('Cp-1').value = Cp.toFixed(0); //ok
        window.document.getElementById('Cp-2').value = Cp.toFixed(0); //ok

        window.document.getElementById('ko-1').value = ko[0].toFixed(2); //ok
        window.document.getElementById('ko-2').value = ko[1].toFixed(2); //ok

        window.document.getElementById('kv-1').value = kv[0].toFixed(2); //ok
        window.document.getElementById('kv-2').value = kv[1].toFixed(2); //ok

        window.document.getElementById('ks-1').value = ks[0].toFixed(2); //ok
        window.document.getElementById('ks-2').value = ks[1].toFixed(2); //ok

        window.document.getElementById('km-1').value = km[0].toFixed(2); //ok
        window.document.getElementById('km-2').value = km[1].toFixed(2); //ok

        window.document.getElementById('cf-1').value = Cf.toFixed(2); //ok
        window.document.getElementById('cf-2').value = Cf.toFixed(2); //ok
        
        window.document.getElementById('i-1').value = I.toFixed(3); //ok
        window.document.getElementById('i-2').value = I.toFixed(3); //ok

        window.document.getElementById('kt-1').value = kt[0].toFixed(2); //ok
        window.document.getElementById('kt-2').value = kt[1].toFixed(2); //ok

        window.document.getElementById('kr-1').value = kr[0].toFixed(2); //ok
        window.document.getElementById('kr-2').value = kr[1].toFixed(2); //ok   
        
        window.document.getElementById('Zn-1').value = Zn[0].toFixed(2); //ok
        window.document.getElementById('Zn-2').value = Zn[1].toFixed(2); //ok
    }
}

function CpmFactor(value) {
    // Definindo a tela

    var tela = document.getElementById('tela'); //ok
    var ctx = tela.getContext('2d'); //ok

    // tamanho da tela
    var tamanhoX = 250; //ok
    var tamanhoY = 110; //ok

    tela.width = tamanhoX; //ok
    tela.height = tamanhoY; //ok

    var afastamento = 20; // afastamento da borda

    // eixo
        // ponto de inicio
        var x1eixo = afastamento; //ok
        var y1eixo = 0.3*tamanhoY; //ok

        // ponto final
        var x2eixo = tamanhoX - x1eixo; //ok
        var y2eixo = 0.3*tamanhoY; //ok

        // desenhando o eixo
        ctx.strokeStyle = 'black'; //cor do eixo
        ctx.beginPath(); //ok
        ctx.moveTo(x1eixo,y1eixo); //ok
        ctx.lineTo(x2eixo,y2eixo); //ok
        ctx.stroke(); //ok
    //

    // mancais

        // mancal 1 
        var w = 15; // largura dos mancais
        var h = w; //ok

        // posições dos vértices
        var x1M1 = x1eixo - 0.5*w; //ok
        var y1M1 = y1eixo - 0.5*h; //ok

        var x2M1 = x1M1 + w; //ok
        var y2M1 = y1M1; //ok

        var x3M1 = x2M1; //ok
        var y3M1 = y2M1 + h; //ok

        var x4M1 = x3M1 - w; //ok
        var y4M1 = y3M1; //ok

        // desenhando o mancal 1
        ctx.strokeStyle = 'black'; //ok

        ctx.strokeRect(x1M1,y1M1,w,h); //ok

        ctx.beginPath(); //ok
        ctx.moveTo(x1M1,y1M1); //ok
        ctx.lineTo(x3M1,y3M1); //ok

        ctx.moveTo(x4M1,y4M1); //ok
        ctx.lineTo(x2M1,y2M1); //ok

        // mancal b 
        var x1M2 = x2eixo - 0.5*w; //ok
        var y1M2 = y2eixo - 0.5*h; //ok

        var x2M2 = x1M2 + w; //ok
        var y2M2 = y1M2; //ok

        var x3M2 = x2M2; //ok
        var y3M2 = y2M2 + h; //ok

        var x4M2 = x3M2 - w; //ok
        var y4M2 = y3M2; //ok

        // desenhando o mancal
        ctx.strokeRect(x1M2,y1M2,w,h); //ok

        ctx.moveTo(x1M2,y1M2); //ok
        ctx.lineTo(x3M2,y3M2); //ok
        ctx.moveTo(x4M2,y4M2); //ok
        ctx.lineTo(x2M2,y2M2); //ok
        ctx.stroke(); //ok
    //

    // engrenagem

        var S1 = Number(value); // distância do centro
        if (isNaN(S1)) {
            var S1 = 0; //ok
        }

        if (S1 >= 0 && S1 <= 0.5) {
            var S = 210*S1; //ok
        }
        
        var D = 40; // diâmetro fictício do pinhão
        var R = 0.5*D; //ok

        // ponto inicial
        var x1eng = 0.5*(x1eixo + x2eixo) - S; //ok
        var y1eng = y1eixo - R; //ok

        // ponto final
        var x2eng = x1eng; //ok
        var y2eng = y1eng + D; //ok

        // desenhando a engrenagem
        ctx.strokeStyle = 'black'; //ok
        ctx.beginPath(); //ok
        ctx.moveTo(x1eng,y1eng); //ok
        ctx.lineTo(x2eng,y2eng); //ok
        ctx.stroke(); //ok

        // linha sup da eng
            // ponto inicial
            var x1l1 = x1eng - 0.25*R; //ok
            var y1l1 = y1eng; //ok

            // ponto final
            var x2l1 = x1eng + 0.25*R; //ok
            var y2l1 = y1eng; //ok
        //

        // linha inf da eng
            // ponto inicial
            var x1l2 = x2eng - 0.25*R; //ok
            var y1l2 = y2eng; //ok

            // ponto final
            var x2l2 = x2eng + 0.25*R; //ok
            var y2l2 = y2eng; //ok
        //

        ctx.beginPath(); //ok
        ctx.moveTo(x1l1,y1l1); //ok
        ctx.lineTo(x2l1,y2l1); //ok
        ctx.stroke(); //ok

        ctx.beginPath(); //ok
        ctx.moveTo(x1l2,y1l2); //ok
        ctx.lineTo(x2l2,y2l2); //ok
        ctx.stroke(); //ok
    //

    // cotas

        // cota do eixo - cota1
            var afastamentoCota1 = R + 30; //ok

            // posição inicial
            var x1cota1 = x1eixo; //ok
            var y1cota1 = y1eixo + afastamentoCota1; //ok

            // posição final
            var x2cota1 = x2eixo; //ok
            var y2cota1 = y2eixo + afastamentoCota1; //ok

            ctx.strokeStyle = 'black'; //ok
            ctx.beginPath(); //ok
            ctx.moveTo(x1cota1,y1cota1); //ok
            ctx.lineTo(x2cota1,y2cota1); //ok
            ctx.stroke(); //ok
        //

        // cota do eixo - cota2
            var afastamentoCota2 = R + 15; //ok

            // posição inicial
            var x1cota2 = 0.5*(x1eixo + x2eixo); //ok
            var y1cota2 = y1eixo + afastamentoCota2; //ok

            // posição final
            var x2cota2 = x2eixo; //ok
            var y2cota2 = y2eixo + afastamentoCota2; //ok

            ctx.strokeStyle = 'black'; //ok
            ctx.beginPath(); //ok
            ctx.moveTo(x1cota2,y1cota2); //ok
            ctx.lineTo(x2cota2,y2cota2); //ok
            ctx.stroke(); //ok
        //

        // cota do eixo - cota3
            // posição inicial
            var x1cota3 = x1eng; //ok
            var y1cota3 = y1eixo + afastamentoCota2; //ok

            // posição final
            var x2cota3 = 0.5*(x1eixo + x2eixo); //ok
            var y2cota3 = y2eixo + afastamentoCota2; //ok

            ctx.strokeStyle = 'black'; //ok
            ctx.beginPath(); //ok
            ctx.moveTo(x1cota3,y1cota3); //ok
            ctx.lineTo(x2cota3,y2cota3); //ok
            ctx.stroke(); //ok
        //

        // cota do mancal esquerdo
            var afastamentoCotaMancal = 4; //ok

            // posição inicial
            var x1cotaMe = x1eixo; //ok
            var y1cotaMe = y4M1 + afastamentoCotaMancal; //ok

            // posição final
            var x2cotaMe = x1cotaMe; //ok
            var y2cotaMe = y1cota1 + afastamentoCotaMancal; //ok

            ctx.strokeStyle = 'black'; //ok
            ctx.beginPath(); //ok
            ctx.moveTo(x1cotaMe,y1cotaMe); //ok
            ctx.lineTo(x2cotaMe,y2cotaMe); //ok
            ctx.stroke(); //ok
        //

        // cota do mancal direito
            // posição inicial
            var x1cotaMd = x2eixo; //ok
            var y1cotaMd = y4M1 + afastamentoCotaMancal; //ok

            // posição final
            var x2cotaMd = x1cotaMd; //ok
            var y2cotaMd = y1cota1 + afastamentoCotaMancal; //ok

            ctx.strokeStyle = 'black'; //ok
            ctx.beginPath(); //ok
            ctx.moveTo(x1cotaMd,y1cotaMd); //ok
            ctx.lineTo(x2cotaMd,y2cotaMd); //ok
            ctx.stroke(); //ok
        //

        // cota do centro do eixo
            // posição inicial
            var x1cotaCe = x1cota2; //ok
            var y1cotaCe = y4M1 + afastamentoCotaMancal; //ok

            // posição final
            var x2cotaCe = x1cotaCe; //ok
            var y2cotaCe = y1cota2 + afastamentoCotaMancal; //ok

            ctx.strokeStyle = 'black'; //ok
            ctx.beginPath(); //ok
            ctx.moveTo(x1cotaCe,y1cotaCe); //ok
            ctx.lineTo(x2cotaCe,y2cotaCe); //ok
            ctx.stroke(); //ok
        //

        // cota da engrenagem do pinhão
            // posição inicial
            var x1cotaEng = x1eng; //ok
            var y1cotaEng = y2eng + afastamentoCotaMancal; //ok

            // posição final
            var x2cotaEng = x1cotaEng; //ok
            var y2cotaEng = y1cota2 + afastamentoCotaMancal; //ok

            ctx.strokeStyle = 'black'; //ok
            ctx.beginPath(); //ok
            ctx.moveTo(x1cotaEng,y1cotaEng); //ok
            ctx.lineTo(x2cotaEng,y2cotaEng); //ok
            ctx.stroke(); //ok
        //
    //

    //texto
        // eixo inteiro
            var afastamentoCotaText = 11; //ok
            // posição do texto
            xText1 = x1cota2 - 0.5*afastamentoCotaText; //ok
            yText1 = y1cota1 + afastamentoCotaText; //ok
            ctx.font = '10px cursive'; //ok
            ctx.fillStyle = 'rgba(10, 16, 103, 0.76)'; //ok
            ctx.fillText('S',xText1,yText1); //ok
        //

        // eixo pela metade
            // posição do texto
            xText2 = 0.5*(x1cota2 + x2cota2) - 1.2*afastamentoCotaText; //ok
            yText2 = y1cota2 + afastamentoCotaText; //ok
            ctx.font = '10px cursive'; //ok
            ctx.fillStyle = 'rgba(10, 16, 103, 0.76)'; //ok
            ctx.fillText('0.5∙S',xText2,yText2); //ok
        //

        // eixo - S1
            // posição do texto
            xText3 = 0.5*(x1cota3 + x2cota3) - 0.5*afastamentoCotaText; //ok
            yText3 = y1cota2 + afastamentoCotaText; //ok
            ctx.font = '10px cursive'; //ok
            ctx.fillStyle = 'rgba(10, 16, 103, 0.76)'; //ok
            ctx.fillText('S1' ,xText3,yText3,40); //ok
        //

        // nome pinhão
            // posição do texto
            xText3 = x2l1; //ok
            yText3 = y2l1 + afastamentoCotaText; //ok
            ctx.font = '10px cursive'; //ok
            ctx.fillStyle = 'rgba(10, 16, 103, 0.76)'; //ok
            ctx.fillText('Pinhão',xText3,yText3); //ok
        //
    //

    // salvando no localStorage
    localStorage.S1 = S1; //ok
}

function resistencia_flexao() {
    var valor = (document.querySelector('input[name="resistence parameter"]:checked').value);

    if (valor === 'N') {
        document.querySelector('.N').style.display = 'block';
        document.querySelector('.T-vida').style.display = 'none';
        document.querySelector('.S-F').style.display = 'none';
    }
    else if (valor === 'L') {
        document.querySelector('.N').style.display = 'none';
        document.querySelector('.S-F').style.display = 'none';
        document.querySelector('.T-vida').style.display = 'block';
    }
    else {
        document.querySelector('.N').style.display = 'none';
        document.querySelector('.T-vida').style.display = 'none';
        document.querySelector('.S-F').style.display = 'block';
    }
}

function selecionarMateriais() {
    document.querySelector('.Materiais').style.display = 'block';
}

function Pinhao () {
    document.getElementById('MaterialPinhao').style.display = 'block';
    document.getElementById('MaterialCoroa').style.display = 'none';
    document.querySelector('.strain7').style.display = 'block';
    document.querySelector('.HB1').style.display = 'flex';
}

function Coroa () {
    document.getElementById('MaterialPinhao').style.display = 'none';
    document.getElementById('MaterialCoroa').style.display = 'block';
    document.querySelector('.strain7').style.display = 'block';
    document.querySelector('.HB2').style.display = 'flex';
}

function Sair() {
    document.querySelector('.Materiais').style.display = 'none';
}

function selecionarMaterialPinhao() {
    var tabela = document.getElementById("MaterialPinhao");
    var linhas = tabela.getElementsByTagName("tr");
  
    for(var i = 0; i < linhas.length; i++){
      var linha = linhas[i];
      linha.addEventListener("click", function(){
        selLinha(this, false); //Selecione apenas um
      });
    }
  
    function selLinha(linha, multiplos){
        if(!multiplos){
            var linhas = linha.parentElement.getElementsByTagName("tr");
            for(var i = 0; i < linhas.length; i++){
            var linha_ = linhas[i];
            linha_.classList.remove("selecionado");    
            }
        }
        linha.classList.toggle("selecionado");
    }

	var selecionados = tabela.getElementsByClassName("selecionado");
    if(selecionados.length == 1){
        var materialPinhao = "";
        document.querySelector('.MatP').style.display = 'block';
    
        for(var i = 0; i < selecionados.length; i++){
            var selecionado = selecionados[i];
            selecionado = selecionado.getElementsByTagName("td");
            var materialPinhao = selecionado[6].innerHTML;
            var Tt1 = selecionado[3].innerHTML;
        }
        localStorage.materialPinhao = materialPinhao;
        localStorage.Tt1 = Tt1;
        HB1();
    }
}

function selecionarMaterialCoroa() {
    var tabela = document.getElementById("MaterialCoroa");
    var linhas = tabela.getElementsByTagName("tr");
  
    for(var i = 0; i < linhas.length; i++){
      var linha = linhas[i];
      linha.addEventListener("click", function(){
        selLinha(this, false); //Selecione apenas um
      });
    }
  
    function selLinha(linha, multiplos){
        if(!multiplos){
            var linhas = linha.parentElement.getElementsByTagName("tr");
            for(var i = 0; i < linhas.length; i++){
            var linha_ = linhas[i];
            linha_.classList.remove("selecionado");    
            }
        }
        linha.classList.toggle("selecionado");
    }

    var selecionados = tabela.getElementsByClassName("selecionado");
    if(selecionados.length == 1){
        var materialCoroa = "";
        document.querySelector('.MatC').style.display = 'block';
    
        for(var i = 0; i < selecionados.length; i++){
            var selecionado = selecionados[i];
            selecionado = selecionado.getElementsByTagName("td");
            var materialCoroa = selecionado[6].innerHTML;
            var Tt2 = selecionado[3].innerHTML;
        }
        localStorage.materialCoroa = materialCoroa;
        localStorage.Tt2 = Tt2;
        HB2();
    }
}

function MPselecionado() {
    document.getElementById('BP').disabled = true;
    document.getElementById('BC').disabled = false;
    document.getElementById('MaterialPinhao').style.display = 'none';
    document.querySelector('.MatP').style.display = 'none';
    document.querySelector('.strain7').style.display = 'none';
    document.querySelector('.HB1').style.display = 'none';
}

function MCselecionado() {
    document.querySelector('.Materiais').style.display = 'none';
    document.getElementById('BC').disabled = true;
    document.getElementById('MaterialCoroa').style.display = 'none';
    document.querySelector('.MatC').style.display = 'none';
    document.querySelector('.strain7').style.display = 'none';
    document.querySelector('.HB2').style.display = 'none';
}

function HB1() {
    var materialPinhao = Number(localStorage.materialPinhao);
    document.getElementById('hb-1').disabled = false;

    var mySlider = document.getElementById("hb-1");
    var sliderValue = document.getElementById("slider-value-1");

    if (materialPinhao == 1) {
        mySlider.min = 180;
        mySlider.max = 400;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 77.3*mySlider.value + 12800;
        var Sc1 = 322*mySlider.value + 29100;
    }
    else if (materialPinhao == 2) {
        mySlider.min = 180;
        mySlider.max = 400;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 102*mySlider.value + 16400;
        var Sc1 = 349*mySlider.value + 34300;
    }
    else if (materialPinhao == 3) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 45000;
        var Sc1 = 170000;
    }
    else if (materialPinhao == 4) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 55000;
        var Sc1 = 190000;
    }
    else if (materialPinhao == 5) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 22000;
        var Sc1 = 175000;
    }
    else if (materialPinhao == 6) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 22000;
        var Sc1 = 195000;
    }
    else if (materialPinhao == 7) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 55000;
        var Sc1 = 180000;
    }
    else if (materialPinhao == 8) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 65000;
        var Sc1 = 225000;
    }
    else if (materialPinhao == 9) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 75000;
        var Sc1 = 275000;
    }
    else if (materialPinhao == 10) {
        mySlider.min = 270;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 82.3*mySlider.value + 12150;
        var Sc1 = 150000;
    }
    else if (materialPinhao == 11) {
        mySlider.min = 270;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 108.6*mySlider.value + 15890;
        var Sc1 = 163000;
    }
    else if (materialPinhao == 12) {
        mySlider.min = 270;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 86.2*mySlider.value + 12730;
        var Sc1 = 170000;
    }
    else if (materialPinhao == 13) {
        mySlider.min = 270;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 113.8*mySlider.value + 16650;
        var Sc1 = 183000;
    }
    else if (materialPinhao == 14) {
        mySlider.min = 300;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 105.2*mySlider.value + 9280;
        var Sc1 = 155000;
    }
    else if (materialPinhao == 15) {
        mySlider.min = 300;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 105.2*mySlider.value + 22280;
        var Sc1 = 172000;
    }
    else if (materialPinhao == 16) {
        mySlider.min = 300;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 105.2*mySlider.value + 29280;
        var Sc1 = 189000;
    }
    else if (materialPinhao == 17) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 5000;
        var Sc1 = 55000;
    }
    else if (materialPinhao == 18) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 8500;
        var Sc1 = 70000;
    }
    else if (materialPinhao == 19) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 13000;
        var Sc1 = 80000;
    }
    else if (materialPinhao == 20) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 27500;
        var Sc1 = 84500;
    }
    else if (materialPinhao == 21) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 27500;
        var Sc1 = 84500;
    }
    else if (materialPinhao == 22) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 33500;
        var Sc1 = 102000;
    }
    else if (materialPinhao == 23) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 38500;
        var Sc1 = 114500;
    }
    else if (materialPinhao == 24) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 10000;
        var Sc1 = 72000;
    }
    else if (materialPinhao == 25) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 13000;
        var Sc1 = 78000;
    }
    else if (materialPinhao == 26) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 16000;
        var Sc1 = 83000;
    }
    else if (materialPinhao == 27) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 21000;
        var Sc1 = 94000;
    }
    else if (materialPinhao == 28) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 5700;
        var Sc1 = 30000;
    }
    else if (materialPinhao == 29) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St1 = 23600;
        var Sc1 = 65000;
    }

    var HB1 = mySlider.value;
    localStorage.HB1 = HB1;
    localStorage.St1 = St1;
    localStorage.Sc1 = Sc1;
}

function HB2() {
    var materialCoroa = Number(localStorage.materialCoroa);
    document.getElementById('hb-2').disabled = false;

    var mySlider = document.getElementById("hb-2");
    var sliderValue = document.getElementById("slider-value-2");

    if (materialCoroa == 1) {
        mySlider.min = 180;
        mySlider.max = 400;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 77.3*mySlider.value + 12800;
        var Sc2 = 322*mySlider.value + 29100;
    }
    else if (materialCoroa == 2) {
        mySlider.min = 180;
        mySlider.max = 400;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 102*mySlider.value + 16400;
        var Sc2 = 349*mySlider.value + 34300;
    }
    else if (materialCoroa == 3) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 45000;
        var Sc2 = 170000;
    }
    else if (materialCoroa == 4) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 55000;
        var Sc2 = 190000;
    }
    else if (materialCoroa == 5) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 22000;
        var Sc2 = 175000;
    }
    else if (materialCoroa == 6) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 22000;
        var Sc2 = 195000;
    }
    else if (materialCoroa == 7) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 55000;
        var Sc2 = 180000;
    }
    else if (materialCoroa == 8) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 65000;
        var Sc2 = 225000;
    }
    else if (materialCoroa == 9) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 75000;
        var Sc2 = 275000;
    }
    else if (materialCoroa == 10) {
        mySlider.min = 270;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 82.3*mySlider.value + 12150;
        var Sc2 = 150000;
    }
    else if (materialCoroa == 11) {
        mySlider.min = 270;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 108.6*mySlider.value + 15890;
        var Sc2 = 163000;
    }
    else if (materialCoroa == 12) {
        mySlider.min = 270;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 86.2*mySlider.value + 12730;
        var Sc2 = 170000;
    }
    else if (materialCoroa == 13) {
        mySlider.min = 270;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 113.8*mySlider.value + 16650;
        var Sc2 = 183000;
    }
    else if (materialCoroa == 14) {
        mySlider.min = 300;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 105.2*mySlider.value + 9280;
        var Sc2 = 155000;
    }
    else if (materialCoroa == 15) {
        mySlider.min = 300;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 105.2*mySlider.value + 22280;
        var Sc2 = 172000;
    }
    else if (materialCoroa == 16) {
        mySlider.min = 300;
        mySlider.max = 340;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 105.2*mySlider.value + 29280;
        var Sc2 = 189000;
    }
    else if (materialCoroa == 17) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 5000;
        var Sc2 = 55000;
    }
    else if (materialCoroa == 18) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 8500;
        var Sc2 = 70000;
    }
    else if (materialCoroa == 19) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 13000;
        var Sc2 = 80000;
    }
    else if (materialCoroa == 20) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 27500;
        var Sc2 = 84500;
    }
    else if (materialCoroa == 21) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 27500;
        var Sc2 = 84500;
    }
    else if (materialCoroa == 22) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 33500;
        var Sc2 = 102000;
    }
    else if (materialCoroa == 23) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 38500;
        var Sc2 = 114500;
    }
    else if (materialCoroa == 24) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 10000;
        var Sc2 = 72000;
    }
    else if (materialCoroa == 25) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 13000;
        var Sc2 = 78000;
    }
    else if (materialCoroa == 26) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 16000;
        var Sc2 = 83000;
    }
    else if (materialCoroa == 27) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 21000;
        var Sc2 = 94000;
    }
    else if (materialCoroa == 28) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 5700;
        var Sc2 = 30000;
    }
    else if (materialCoroa == 29) {
        mySlider.min = 0;
        mySlider.max = 0;
        var valPercent = ((mySlider.value - mySlider.min)/(mySlider.max - mySlider.min))*100;
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue.textContent = mySlider.value + ' HB';

        var St2 = 23600;
        var Sc2 = 65000;
    }

    var HB2 = mySlider.value;
    localStorage.HB2 = HB2;
    localStorage.St2 = St2;
    localStorage.Sc2 = Sc2;
}

function CoeficienteElastico() {
    var materialPinhao = Number(localStorage.materialPinhao);
    var materialCoroa = Number(localStorage.materialCoroa);

    var v1 = 0.3;
    var v2 = v1;
    
    
    if (materialPinhao >= 1 && materialPinhao <= 16) {
        var E1 = 30e6;
    }
    else if (materialPinhao > 16 && materialPinhao <= 19) {
        var E1 = 22e6;
    }
    else if (materialPinhao > 19 && materialPinhao <= 23) {
        var E1 = 24e6;
    }
    else if (materialPinhao > 23 && materialPinhao <= 27) {
        var E1 = 25e6;
    }
    else if (materialPinhao == 28) {
        var E1 = 16e6;
    }
    else {
        var E1 = 17.5e6;
    }

    if (materialCoroa >= 1 && materialCoroa <= 16) {
        var E2 = 30e6;
    }
    else if (materialCoroa > 16 && materialCoroa <= 19) {
        var E2 = 22e6;
    }
    else if (materialCoroa > 19 && materialCoroa <= 23) {
        var E2 = 24e6;
    }
    else if (materialCoroa > 23 && materialCoroa <= 27) {
        var E2 = 25e6;
    }
    else if (materialCoroa == 28) {
        var E2 = 16e6;
    }
    else {
        var E2 = 17.5e6;
    }
    
    
   setTimeout(function() {
    window.document.getElementById('E1').value = E1.toExponential();
    window.document.getElementById('E2').value = E2.toExponential();

    window.document.getElementById('Poisson1').value = v1.toFixed(2);
    window.document.getElementById('Poisson2').value = v2.toFixed(2);
   }, 100)
   
}

localStorage.clear();