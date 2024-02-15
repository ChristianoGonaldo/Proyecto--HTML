var año;
var totalDias;

var salario;
var salarioBase;
var salarioConComplementos;
var totalComplementosSalariales;
var totalComplementosNOSalariales;
var pagasExtras;
var impuestoIRPF;
var liquidoPercibido;
var valorHorasExtra;
var trabajadorDeduciones;

var baseCotizacionContingenciasComunes;
var baseCotizacionContingenciasProfesionales;
var baseCotizacionDesempleo;
var baseCotizacionFormacionProfesional;
var baseCotizacionFogasa;
var baseCotizacionHorasExtras;


function calcular(){
    anioBisiesto();
    calcularSalario();
    complementosSalariales();
    complementoNoSalariales();
    calcularPagasExtra()
    calcularBaseCotizacionContingenciasComunes();
    calcularBaseCotizacionContingenciasProfesionales();
    calcularBaseCotizacionDesempleo();
    calcularBaseCotizacionFormacionProfesional();
    calcularBaseCotizacionFogasa();
    calcularCuotaCotizacionHorasExtras();
    calcularHorasExtras();
    liquidoPercibir();
    impuestoRentaPersonasFisicas();
}

function anioBisiesto(){
    var meses = parseInt(document.getElementById("meses").value);
    totalDias = meses;
    var anio = parseInt(document.getElementById("anio").value);
    año = 365;

    if((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)){
        año = 366
    }

    if(meses === 28 && año === 366){
        totalDias = 29
    }
    document.getElementById("totalDias").innerHTML = totalDias;
}

function calcularSalario(){
    salarioBase = parseFloat(document.getElementById("salarioBase").value);
        if(salarioBase < 500){
            salarioBase = salarioBase * totalDias;
        }
        document.getElementById("salarioBaseSalida").innerHTML = salarioBase;
}

function complementosSalariales(){
            
    var primer = parseFloat(document.getElementById("primerCompleCash").value);
    var segund = parseFloat(document.getElementById("segundoCompleCash").value);
    var tercer = parseFloat(document.getElementById("tercerCompleCash").value);

    var primertxt = document.getElementById("primerCompletxt").value;
    var segundtxt = document.getElementById("segundoCompletxt").value;
    var tercertxt = document.getElementById("tercerCompletxt").value;

    document.getElementById("primerCompleCash").innerHTML = (isNaN(primer) || primertxt === "") ? 0 : primer;
    document.getElementById("primerCompletxt").innerHTML = (isNaN(primer) || primertxt === "") ? "No hay" : primertxt;

    document.getElementById("segundoCompleCash").innerHTML = (isNaN(segund) || segundtxt === "") ? 0 : segund;
    document.getElementById("segundoCompletxt").innerHTML = (isNaN(segund) || segundtxt === "") ? "No hay" : segundtxt;

    document.getElementById("tercerCompleCash").innerHTML = (isNaN(tercer) || tercertxt === "") ? 0 : tercer;
    document.getElementById("tercerCompletxt").innerHTML = (isNaN(tercer) || tercertxt === "") ? "No hay" : tercertxt;

    //Posible parsefloat
    totalComplementosSalariales = primer + segund + tercer;
    document.getElementById("calculoComplementosSalariales").innerHTML = totalComplementosSalariales;
    salarioConComplementos = salarioBase + totalComplementosSalariales;
}

function complementoNoSalariales() {
    var primer = parseFloat(document.getElementById("primerNOCompleCashEntrada").value);
    var segundo = parseFloat(document.getElementById("segundoNOCompleCashEntrada").value);
    var tercer = parseFloat(document.getElementById("tercerNOCompleCashEntrada").value);
    var cuarto = parseFloat(document.getElementById("cuartoNocompleCashEntrada").value);

    var primertxt = document.getElementById("IndemnizacionesSuplidosEntrada").value;
    var segundtxt = document.getElementById("IndemnizacionesDeLaSegSocialEntrada").value;
    var tercertxt = document.getElementById("IndemnizacionesDebidoTrasSuspDespEntrada").value;
    var cuartotxt = document.getElementById("OtrasPercepcionesNoSalarialesEntrada").value;

    // Comprobación y asignación de valores
    document.getElementById("primerNOCompleCashEntrada").value = isNaN(primer) ? 0 : primer;
    document.getElementById("IndemnizacionesSuplidosEntrada").value = primertxt === "" ? "No hay" : primertxt;

    document.getElementById("segundoNOCompleCashEntrada").value = isNaN(segundo) ? 0 : segundo;
    document.getElementById("IndemnizacionesDeLaSegSocialEntrada").value = segundtxt === "" ? "No hay" : segundtxt;

    document.getElementById("tercerNOCompleCashEntrada").value = isNaN(tercer) ? 0 : tercer;
    document.getElementById("IndemnizacionesDebidoTrasSuspDespEntrada").value = tercertxt === "" ? "No hay" : tercertxt;

    document.getElementById("cuartoNocompleCashEntrada").value = isNaN(cuarto) ? 0 : cuarto;
    document.getElementById("OtrasPercepcionesNoSalarialesEntrada").value = cuartotxt === "" ? "No hay" : cuartotxt;

    // Calcular el total de complementos no salariales y establecer el valor en el campo de salida
    totalComplementosNOSalariales = primer + segundo + tercer + cuarto;
    document.getElementById("ComplementosNOSalarialesSalida").value = totalComplementosNOSalariales;
}

function calcularPagasExtra() {
    var pagas = parseInt(document.getElementById('GratificacionesExtraordinariasNumero').value);
    var varias = document.getElementById('GratificacionesExtraordinariasEntrada').value.split(',');
    var grupoCotizacion = parseFloat(document.getElementById('grupoCotizacion').value);
    var complementos = 0;
    var remuneracion;
    

    console.log("pagas", pagas)
    console.log("varias", varias)
    console.log("grupo", grupoCotizacion)

    if (pagas === isNaN(pagas) || varias === "") { 
        pagasExtras = 0.0;
    } else {
        for (var i = 0; i < varias.length; i++) {
            complementos += parseFloat(varias[i]) || 0;
        }
        if (grupoCotizacion >= 1 && grupoCotizacion <= 7) {
            remuneracion = (pagas * complementos) / 12;
            console.log("remunera", remuneracion);
        } else {
            remuneracion = ((pagas * 30) * complementos) / año;
        }
        pagasExtras = remuneracion;
        console.log("pagas", pagasExtras);
    }
    document.getElementById("GratificacionesExtraordinariasSalida").innerHTML = pagasExtras;
}

function impuestoRentaPersonasFisicas(){
    impuestoIRPF = totalDevengado/(parseFloat(document.getElementById("ImpuestoPersonasFisicasEntrada").value)*100)
    document.getElementById("ImpuestoPersonasFisicasSalida").innerHTML = impuestoIRPF;
}

function liquidoPercibir(){
    liquidoPercibido = totalDevengado - impuestoIRPF;
    document.getElementById("LiquidoTotalPercibir2").innerHTML = liquidoPercibido;
}

function calcularHorasExtras(){
    valorHorasExtra = parseFloat(document.getElementById("HorasExtraordinariasDevengosCashEntrada").value);
    tipoHorasExtraEmpresa = document.getElementById("HorasExtraordinariasDevengosTipoEntrada").value;
    tipoHorasExtraTrabajador = document.getElementById("HorasExtraordinariasDevengosTipoEntrada").value;

    dineroHorasExtraEmpresa;
    dineroHorasExtraTrabajador;

    if(document.getElementById("HorasExtraordinariasDevengosTipoEntrada").value === "FuerzaMayor"){
        dineroHorasExtraEmpresa = valorHorasExtra * 0.1200;
        dineroHorasExtraTrabajador = valorHorasExtra * 0.0200;
        document.getElementById("HorasExtraordinariasDevengosTipoSalida").innerHTML = "Fuerza mayor";
        document.getElementById("HorasExtraordinariasCalculadas").innerHTML = dineroHorasExtraTrabajador;
        document.getElementById("").innerHTML = dineroHorasExtraEmpresa; //Preguntar donde poner
    }else if(document.getElementById("HorasExtraordinariasDevengosTipoEntrada").value === "Normal"){
        dineroHorasExtraEmpresa = valorHorasExtra * 0.2360;
        dineroHorasExtraTrabajador = valorHorasExtra * 0.0470;
        document.getElementById("HorasExtraordinariasDevengosTipoSalida").innerHTML = "Normal";
        document.getElementById("HorasExtraordinariasCalculadas").innerHTML = dineroHorasExtraTrabajador;
        document.getElementById("").innerHTML = dineroHorasExtraEmpresa; //Preguntar donde poner
    }else{
        // tipoHorasExtraEmpresa = "No hay";
        // tipoHorasExtraTrabajador = "No hay";
        document.getElementById("HorasExtraordinariasDevengosTipoSalida").innerHTML = "No hay";
        document.getElementById("HorasExtraordinariasCalculadas").innerHTML = 0;
        document.getElementById("").innerHTML = 0; //Preguntar donde poner
    }

    // HACER
    document.getElementById("HorasExtraordinariasCalculadas").innerHTML = tipoHorasExtraTrabajador;
    //document.getElementById("").innerHTML = tipoHorasExtraEmpresa;
}

//BASES
function calcularBaseCotizacionContingenciasComunes() {
    baseCotizacionContingenciasComunes = salarioConComplementos + pagasExtras + totalComplementosNOSalariales;
    totalDevengado = baseCotizacionContingenciasComunes + valorHorasExtra;

    // baseCotizacionContingenciasComunes = totalDias * baseCotizacionContingenciasComunes; //No se si tan siquiera tiene sentido
    console.log("Base cotizacion contingencias comunes", baseCotizacionContingenciasComunes);
    document.getElementById("mensual").innerHTML = parseFloat(salarioConComplementos); //No se donde ponerlo
    document.getElementById("TotalDevengado2Entrada").value = totalDevengado; //No estoy seguro de si va aqui
}

function calcularBaseCotizacionContingenciasProfesionales(){
    
    if(valorHorasExtra !== NaN(valorHorasExtra)){
        baseCotizacionContingenciasProfesionales = baseCotizacionContingenciasComunes + valorHorasExtra;
    }else{
        baseCotizacionContingenciasProfesionales = baseCotizacionContingenciasComunes;
    }
    console.log("Base cotizacion contingencias profesionales", baseCotizacionContingenciasProfesionales);
    //document.getElementById("HorasExtraordinariasCalculadasSalida").innerHTML = HorasExtrasDinero;
    document.getElementById("determinacionTOTAL").innerHTML = baseCotizacionContingenciasProfesionales; //No se donde enlazar el id de las base cp
}

function calcularBaseCotizacionDesempleo(){
    baseCotizacionDesempleo = baseCotizacionContingenciasProfesionales;
    console.log("Base Desempleo", baseCotizacionDesempleo);
    document.getElementById("desempleoTOTAL").innerHTML = baseCotizacionDesempleo;
    // document.getElementById("desempleoTOTAL").innerHTML = baseCotizacionDesempleo;  No se donde ponerlo
}

function calcularBaseCotizacionFormacionProfesional(){
    baseCotizacionFormacionProfesional = baseCotizacionContingenciasProfesionales;
    document.getElementById("DeterminacionFormacionProfesional").innerHTML = baseCotizacionFormacionProfesional;  //No se donde ponerlo
    console.log("Base formacion profesional", baseCotizacionFormacionProfesional);
}

function calcularBaseCotizacionFogasa(){
    baseCotizacionFogasa = baseCotizacionContingenciasProfesionales;
    document.getElementById("fondogarantia").innerHTML = baseCotizacionFogasa;  //No se donde ponerlo
    console.log("Base fogasa", baseCotizacionFogasa);
}

//DUDA
function calcularCuotaCotizacionHorasExtras(){
    var HorasExtrasEmpresaNormales = 0;
    var HorasExtrasEmpresaFuerzaMayor = 0;
    var HorasExtrasTrabajadorNormales = 0;
    var HorasExtrasTrabajadorFuerzaMayor = 0;

    var tipoHorasExtraValue = document.getElementById("CuotaHorasExtrasTipo").value;

    //Los porcentajes pueden variar con el tiempo
    HorasExtrasEmpresaNormales = parseFloat(document.getElementById("CuotaHorasExtrasDinero").value) * 0.2360;
    HorasExtrasTrabajadorNormales = parseFloat(document.getElementById("CuotaHorasExtrasDinero").value) * 0.0470;

    HorasExtrasEmpresaFuerzaMayor = parseFloat(document.getElementById("CuotaHorasExtrasDinero").value) * 0.1200;
    HorasExtrasTrabajadorFuerzaMayor = parseFloat(document.getElementById("CuotaHorasExtrasDinero").value) * 0.0200;

    // if(HorasExtrasTrabajadorNormales === 0 && contratoValue !== "Normal" && contratoValue !== "FuerzaMayor" ){
    //     HorasExtrasEmpresaNormales = 0;
    //     HorasExtrasEmpresaFuerzaMayor = 0;
    //     HorasExtrasTrabajadorNormales = 0;
    //     HorasExtrasTrabajadorFuerzaMayor = 0;
    // }
    document.getElementById("fuerzaMayorEmpresa").innerHTML = parseFloat(document.getElementById("CuotaHorasExtrasDinero").value)
    
    document.getElementById("valorHorasEmpresaNormales").innerHTML = HorasExtrasEmpresaNormales;   //No se donde va
    document.getElementById("DeterminacionFuerzaMayor").innerHTML = HorasExtrasEmpresaFuerzaMayor;
    document.getElementById("HorasExtraordinariasDeduccionesNormales").innerHTML = HorasExtrasTrabajadorNormales;   //No se donde va
    document.getElementById("HorasExtraordinariasDeduccionesFuerzaMayor").innerHTML = HorasExtrasTrabajadorFuerzaMayor;
}

// CUOTAS
function calcularCuotaCotizacionContingenciasComunes(){
    var TrabajadorCcc = baseCotizacionContingenciasComunes * 0.0482;
    trabajadorDeduciones += TrabajadorCcc;
    var EmpresaCcc = baseCotizacionContingenciasComunes * 0.2418; //En duda donde se mete
    document.getElementById("contingenciasComunesCalculadas").innerHTML = TrabajadorCcc;
    document.getElementById("contingenciasComunesCalculadasEmpresa").innerHTML = EmpresaCcc;
    // salario = EmpresaCcc; //En duda
}

//No se donde se pone 
function calcularCuotaCotizacionContingenciasProfesionales(){
    var contingenciasProfesionales = baseCotizacionContingenciasProfesionales * (parseFloat(document.getElementById("tarifaPrim").value)/(100)) //No se donde se mete la tarifa de primos, hacer un select 
    document.getElementById("tarifaPrimasCalculada").innerHTML = contingenciasProfesionales; //No se donde enlazarlo
}

//No se donde se pone el tipo de contrato
function calcularCuotaCotizacionDesempleo(){
    var EmpresaCcd;
    var TrabajadorCcd;


    //PREGUNTAR COMO SABER EL TIPO DE CONTRATO
    if (document.getElementById("contrato").value === "Indefinido")  { //No hay tipo contrato no se donde ponerlo
        EmpresaCcd = baseCotizacionDesempleo * 0.0550;
        TrabajadorCcd = baseCotizacionDesempleo * 0.0155;
    }else if (document.getElementById("contrato").value === "ComplOParcial") {
        EmpresaCcd = baseCotizacionDesempleo * 0.0670;
        TrabajadorCcd = baseCotizacionDesempleo * 0.0160;
    }else{
        EmpresaCcd = "Tipo de contrato failed";
        TrabajadorCcd = "Tipo de contrato failed";
    }

    document.getElementById("CuotaCotizacionDesempleoTrabajador").innerHTML = TrabajadorCcd; //No se lugar 
    trabajadorDeduciones += TrabajadorCcd;
    document.getElementById("CuotaCotizacionDesempleoEmpresa").innerHTML = EmpresaCcd;
}

function calcularCuotaCotizacionFormacionProfesional(){
    var TrabajadorCfp = baseCotizacionFormacionProfesional * 0.0010;
    var EmpresaCfp = baseCotizacionFormacionProfesional * 0.0060; 
    document.getElementById("formacionProfesionalCalculada").innerHTML = TrabajadorCfp;
    trabajadorDeduciones += TrabajadorCfp;
    document.getElementById("formacionProfesionalCalculadaEmpresa").innerHTML = EmpresaCfp; //No se donde va
}

function calcularCuotaCotizacionFogasa(){
    var EmpresaFogasa = baseCotizacionFogasa * 0.0020;
    document.getElementById("fondoGarantiaSalarialEmpresa").innerHTML = EmpresaFogasa; //No se donde va
}


// CREO QUE ESTA REPETIDA
// function calcularTotalDeducir(){
//     var deducido;
//     var Totaldeducido;
//     deducido = trabajadorDeduciones + impuestoIRPF;
//     Totaldeducido = salario - deducido;
// }