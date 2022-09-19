let prix = document.getElementById("price");
let frs = document.getElementById("frais");
let reduc = document.getElementById("reduction");
let sma = document.querySelector('small');
let sub = document.getElementById('submet');
let nom = document.getElementById("name");
let cat = document.getElementById("category");
let table=document.getElementsByTagName('table')[0];
let id=0;
let tr1 = document.getElementsByTagName('tr')
let bd = document.getElementsByTagName('tbody')[0];
let arrayProdact;
let ind;
let delALL=document.getElementById('delAll');
let modePrograme = 'ajoute';
let Modifier =document.getElementById('Modifier');
let Supprime =document.getElementById('Supprime');
let t;



let dark= document.getElementById('dark');
console.log(dark)
dark.onmouseover= function chngDark(){
    dark.src="Images/dark2.png";
}
dark.onmousemove= function chngDark(){
    dark.src="Images/dark.png";
}
function ToDark(){
 
        dark.src="Images/dark2.png";
        document.body.style.background="rgba(53,54,58,1)";
        document.body.style.color="#fff";
        document.getElementsByTagName('tbody')[0].style.color="#000"
       
    }



if(localStorage.getItem('keyProdact') == null){
    arrayProdact=[];
}else{
    arrayProdact=JSON.parse(localStorage.getItem('keyProdact'));
}



// display finaly price of prodacte
function prixTotal(){
    if(prix.value != ''){
     let tot= (+prix.value + +frs.value - +reduc.value) ;
     sma.innerText = tot;
   }
}



sub.onclick= function(){
  
    if(nom.value=="" && cat.value=="" && prix.value=="" && frs.value=="" && reduc.value==""){
        alert("Entre des donnes valides")
         return
     }


    let newProdact={
        nom:  nom.value,
        cat: cat.value,
        prix: prix.value,
        frs: frs.value,
        reduc: reduc.value,
        total:(+prix.value + +frs.value - +reduc.value),
    }
    if(modePrograme=="ajoute"){
     arrayProdact.push(newProdact);
    }else{
        arrayProdact[t] = newProdact;
        modePrograme="ajoute"
        sub.innerText="Ajouter"
    }
     localStorage.setItem('keyProdact', JSON.stringify(arrayProdact));  
     dipsData();
     clienInput();


}



//clien data from inputs
function clienInput(){
    nom.value="";
    cat.value="";
    prix.value="";
    frs.value="";
    reduc.value="";
    sma.innerText ="";

}

function dipsData(){
    
   let t = '';

   for(i=0;i<arrayProdact.length;i++){
      t +=`<tr>
      <td>${i}</td>
      <td>${arrayProdact[i].nom}</td>
      <td>${arrayProdact[i].cat}</td>
      <td>${arrayProdact[i].prix}</td>
      <td>${arrayProdact[i].frs}</td>
      <td>${arrayProdact[i].reduc}</td>
      <td>${arrayProdact[i].total}</td>
      <td><button style="background: transparent; border:none; cursor:pointer width:30px" onclick="updeatProdact(${i})"><img src="Images/updeat.png" style="width:30px"></button></td>
      <td><button style="background: transparent; border:none; cursor:pointer width:30px" id="Supprime" onclick="deleatProdact(${i})"><img src="Images/delete1.png"></button></td></tr>`
   }
      bd.innerHTML=t;
    
      if(arrayProdact.length >0){
         console.log(localStorage.getItem('KeyProdact'))
         delALL.innerHTML=`
         <button id="btnClear" onclick="clearAll()" style="background:transparent; border:none ;"><img src="images/Trash.png" style="height:100%"</button>`
      }else{
        delALL.innerHTML='';
      }
      
}




function deleatProdact(ind){
    arrayProdact.splice(ind,1);
    localStorage.setItem('keyProdact',JSON.stringify(arrayProdact));
    dipsData();
}

function clearAll(){
        localStorage.clear();
        arrayProdact=[]; //or we can use splice(0);
        dipsData();   
}

function updeatProdact(ind){
    nom.value = arrayProdact[ind].nom;
    cat.value = arrayProdact[ind].cat;
    prix.value = arrayProdact[ind].prix;
    frs.value=arrayProdact[ind].frs;
    reduc.value=arrayProdact[ind].reduc;
    prixTotal();
    sub.innerText='Modifier'
    modePrograme='Modifier';

    t=ind;
}






let SRMode = 'name';
let cherche = document.getElementsByClassName('search')[0];

function search(i){
    if(i == 'b2'){
       SRMode = 'category';
       cherche.placeholder = "Entre une categorie.";
    }else{
        cherche.placeholder = "Entre un nom.";
    }
    cherche.focus();
}


function searchPro(value){
    console.log(value)
    let t = '';
    if(SRMode == 'name'){

     for(let i = 0; i< arrayProdact.length; i++){
        // document.getElementById('b1').style.border="none";
        // document.getElementById('b1').style.background="#ae00ff"
        if(arrayProdact[i].nom.includes(value)){
                        t +=`<tr>
                <td>${i}</td>
                <td>${arrayProdact[i].nom}</td>
                <td>${arrayProdact[i].cat}</td>
                <td>${arrayProdact[i].prix}</td>
                <td>${arrayProdact[i].frs}</td>
                <td>${arrayProdact[i].reduc}</td>
                <td>${arrayProdact[i].total}</td>
                <td><button style="background: transparent; border:none; cursor:pointer width:30px heigth:30px " id="Modifier" onclick="updeatProdact(${i})"><img src="Images/updeat.png" style="heigth:30px; width:30px"></button></td>
                <td><button style="background: transparent; border:none; cursor:pointer width:30px heigth:30px" id="Supprime" onclick="deleatProdact(${i})"><img src="Images/delete1.png"></button></td></tr>`
            
            }  
           
         }
        
     }


     else{
        
        for(let i = 0; i< arrayProdact.length; i++){
            // document.getElementById('b2').style.border="none";
            // document.getElementById('b2').style.background="#ae00ff"
            if(arrayProdact[i].cat.includes(value)){
                            t +=`<tr>
                    <td>${i}</td>
                    <td>${arrayProdact[i].nom}</td>
                    <td>${arrayProdact[i].cat}</td>
                    <td>${arrayProdact[i].prix}</td>
                    <td>${arrayProdact[i].frs}</td>
                    <td>${arrayProdact[i].reduc}</td>
                    <td>${arrayProdact[i].total}</td>
                    <td><button style="background: transparent; border:none; cursor:pointer width:30px heigth:30px " id="Modifier" onclick="updeatProdact(${i})"><img src="Images/updeat.png" style="heigth:30px; width:30px"></button></td>
                <td><button style="background: transparent; border:none; cursor:pointer width:30px heigth:30px" id="Supprime" onclick="deleatProdact(${i})"><img src="Images/delete1.png"></button></td></tr>`
                   
                }  
             }
            
            
          
           
          
      }



      bd.innerHTML=t;
          
          

}

dipsData();


let sidebare=document.getElementsByClassName('sideBare')[0];

function sidenone(){
    sidebare.classList.toggle('sideBareNone');
}