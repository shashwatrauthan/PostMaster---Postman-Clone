// Trageting Data Input Fields
let parametersElem = document.getElementById("parametersElem");
let paramElems = document.getElementById("paramElems");
let jsonElem = document.getElementById("jsonElem");

parametersElem.style.display = "none";

// Hiding Data input Fields according to selected content type radio box 
let jsonRadio = document.getElementById("json");
jsonRadio.addEventListener("change",(e)=>{
    parametersElem.style.display = "none";
    paramElems.style.display = "none";
    jsonElem.style.display = "block";
});

let customParamsRadio = document.getElementById("customParams");
customParamsRadio.addEventListener("change",(e)=>{
    parametersElem.style.display = "block";
    paramElems.style.display = "block";
    jsonElem.style.display = "none";
});


// adding custom parameters fields
let addParam = document.getElementById("addParam");

addParam.addEventListener('click',()=>{
    // custom parameter field to be added to DOM
    let string=`<div class="mb-1 row">
    <label class="col-sm-2 col-form-label"></label>
    <div class="col-sm-3">
    <input type="text" class="form-control keyItem" placeholder="Key">
    </div>
    <div class="col-sm-3">
    <input type="text" class="form-control valueItem" placeholder="Value">
    </div>
    <div class="col-sm-2">
        <button type="submit" id="addParam" class="btn btn-primary mb-3" onclick="javascript: this.parentElement.parentElement.remove();">–</button>
    </div>
    </div>`;

    paramElems.innerHTML+= string;

});


// Submit Button Functionality
let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click",()=>{

    // retrieving values of selected radio buttons
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // creating data object from custom parameters fileds
    let data = {};
    if(contentType=="PARAMS")
    {
        // for default parameter
        let key = document.getElementById("paramKey1").value;
        let value = document.getElementById("paramValue1").value;
        data[key] = value;

        // for extra parameters
        let parameterElements = document.getElementById("paramElems").children;
        for(let param of parameterElements)
        {
            key = param.querySelector(".keyItem").value;
            value = param.querySelector(".valueItem").value;
            data[key] = value;
        }

        data = JSON.stringify(data);
    }
    else
    {
        // data from JSON field
        data = document.getElementById("inputJSON").value;
    }


    let url = document.getElementById("inputURL").value;
    let responseElem = document.getElementById("response");

    // Creating GET / POST request using fetch API
    if(requestType == "GET")
    {
        if(url!='')                         //check for empty data field (URL)
        {
            responseElem.innerHTML = "Please wait. Fetching Response...";
            fetch(url).then(response => response.text()).then(text => {responseElem.innerHTML=text; Prism.highlightAll();});                         //Prism JS is used to beautify response data
        }
        else
        {
            responseElem.innerHTML = "Please enter the URL";
        }
    }
    else
    {
        if(url!='' && data!='' && data != '{"":""}')                 //check for empty data fields (URL/JSON/Custom Parameters)
        {
            responseElem.innerHTML = "Please wait. Fetching Response...";

            let params = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: data
            };
            fetch(url,params).then(response => response.text()).then(text => {responseElem.innerHTML=text; Prism.highlightAll();});                        //Prism JS is used to beautify response data
        }
        else
        {
            responseElem.innerHTML = "Please enter the data first";
        }
    }

});