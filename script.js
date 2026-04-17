const API_KEY = '31700f31b81174d053b0c5e401d83ede2f6e1536'
const wger_Base_Url = 'https://wger.de/api/v2'

function handleLogin(){
    const userNameInput = document.getElementById('loginName')
    const userPassword = document.getElementById('loginPassword')
}
document.getElementById('specificsForm').addEventListener('click', function(){
        let userMass = document.getElementById('userMass').value
        let userHeight = document.getElementById('userHeight').value
        let displayBMI = document.querySelector('#displayBMI')

        let userHeightM = parseFloat(userHeight/100)
        let BMI = (userMass/(userHeightM * userHeightM)).toFixed(2)

        
        if(!userMass || !userHeight){
            alert('Ensure you have filled the mass and height fields')
        }else if(isNaN(userHeight || userMass)){
            alert('Kindly ensure you have entered number values into the fields')
        }
        else{

            let bmiMessage = displayBMI.textContent = `Your BMI is ${BMI}`
            if(BMI <= 18.5){
                displayBMI.innerHTML = `${bmiMessage} :: You are underweight`
                displayBMI.style.color = 'navy'
            }
            else if(BMI >=18.5 && BMI <=24.9){
                displayBMI.innerHTML = `${bmiMessage} :: You are of healthy weight`
                displayBMI.style.color = 'green'
            }
            else if(BMI >= 25.0 && BMI <=29.9){
                displayBMI.innerHTML = `${bmiMessage} :: You are overweight`
                displayBMI.style.color = 'gold'
            }
            else{
                displayBMI.innerHTML = `${bmiMessage} :: You are in the range of obesity`
                displayBMI.style.color = 'crimson'
            }

        } 
    })
    
async function getExerciseCategory() {
    try{
        const response = await fetch(`${wger_Base_Url}/exercisecategory/?language=2`,{
            method: 'GET',
            headers: {
                'Authorization': `Token ${API_KEY}`,
                'Accept': 'application/json'
            }
        })

    const data = await response.json()
    console.log('Exercises', data)
    return data.results

    }
    
    catch(error){
        console.log(error)
    }
    
}

async function getExerciseImage(imageId) {
    try{
        const response = await fetch(`${wger_Base_Url}/exerciseimage/?language=2`,{
            method: 'GET',
            headers: {
                'Authorization': `Token ${API_KEY}`,
                'Accept': 'application/json'
            }
        })

    const data = await response.json()
    console.log('Exercises', data.results[0].image)

    const body = document.body
    
    data.reults.forEach(element => {
        const exerciseOutput = document.getElementById('exerciseOutput')
        body.append(exerciseOutput)
        const imgDiv = document.createElement('img')

        imgDiv.src = data.results[element].image

        body.append(imgDiv)
    });
    
    }
    
    catch(error){
        console.log(error)
    }
    
}

async function displayExercise() {
    const exercises = await getExerciseCategory()
    console.log(exercises)

    const exerciseImg = await getExerciseImage()

    
}
    

displayExercise()