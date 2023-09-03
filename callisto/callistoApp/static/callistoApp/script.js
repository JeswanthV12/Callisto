document.addEventListener('DOMContentLoaded', () => {
    
    for (let i = 0; i < document.querySelectorAll('.btn-danger').length; i++) {
        // var handler = function() {
        //     alert('hi');
        //     document.querySelectorAll('.btn-danger')[i].removeEventListener('click', handler, true);
        // };
        
        // document.querySelectorAll('.btn-danger')[i].addEventListener('click', handler, true);

        let count = 0;

        document.querySelectorAll('.btn-danger')[i].onclick = () => {
            
            if (count > 0) {
                var id = document.querySelectorAll('.btn-danger')[i].getAttribute('data-id');
                remove(id);
            } else {
                alert('Are You Sure?');
            }
            
            count++;
        }
        
    }

    UseApiRequest();

    var correct_choices = ["8", "True", "Jupiter", "2", "trillions of years", "The Photosphere", "Size & Shape", "Venus", "Mars & Jupiter", "Carbon Dioxide"]

    document.querySelector('#test_button').onclick = () => {
        let score = 0;
        document.getElementById("test_div").innerHTML = "";
        var input_tags = document.getElementsByTagName('input');
            
        for (i = 0; i < input_tags.length; i++) {
            if (input_tags[i].checked) {
                if (correct_choices.includes(`${input_tags[i].value}`)) {
                    ++score;
                }
            }
        }

        document.getElementById("test_div").innerHTML = `<h3>You Scored: ${score}/10.</h3>`

        score = 0;

        for(i = 0; i < input_tags.length; i++) {
            input_tags[i].checked = false;
        }
    };
    
});

function UseApiRequest() {
    // api key
    let API_KEY = "hXWDAGPSwFKXPB376EtRkBLDSW4q53Diweix45wA";

    // array for mars feature
    let array = [];

    // today's date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // fetch image of the day from NASA APOD API
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => imageOfDay(data))

    // fetch asteroid data from NASA Asteroids NeoWs API
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=&end_date=${today}&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => asteroid(data, today))

    // fetch astronomy news from spaceflightnewsapi
    fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=15`)
    .then(response => response.json())
    .then(data => news(data))

    fetch("https://fdo.rocketlaunch.live/json/launches/next/5")
    .then(response => response.json())
    .then(data => launches(data))

    // fetch mars pictures and push to array
    // fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
    // .then(response => response.json())
    // .then(data => array.push(data))

    // fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=${API_KEY}`)
    // .then(response => response.json())
    // .then(data => array.push(data))

    // fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=1000&api_key=${API_KEY}`)
    // .then(response => response.json())
    // .then(data => array.push(data))
    
    // mars(array);
}
            
function imageOfDay(data) {
    // fill divs with imageOfDay content
    document.querySelector('#content-description').innerHTML = data.explanation;
    document.querySelector('#content-img').innerHTML = `<img class="img-fluid" src="${data.url}">`;
}

function asteroid(data, today) {
    for (let i = 0; i < data.element_count; i++) {
        var tr_tag = document.createElement('tr');
        var th_tag = document.createElement('th');
        var td_tag1 = document.createElement('td');
        var td_tag2 = document.createElement('td');
        var td_tag3 = document.createElement('td');

        th_tag.scope = "row";
        th_tag.innerHTML = i + 1;
        td_tag1.innerHTML = data.near_earth_objects[today][i].name;
        td_tag2.innerHTML = `Min: ${data.near_earth_objects[today][i].estimated_diameter.meters.estimated_diameter_min} Max: ${data.near_earth_objects[today][i].estimated_diameter.meters.estimated_diameter_max}`;
        if (data.near_earth_objects[today][i].is_potentially_hazardous_asteroid) {
            td_tag3.innerHTML = `<b>${data.near_earth_objects[today][i].is_potentially_hazardous_asteroid}</b>`;
        } else {
            td_tag3.innerHTML = data.near_earth_objects[today][i].is_potentially_hazardous_asteroid;
        }

        tr_tag.append(th_tag);
        tr_tag.append(td_tag1);
        tr_tag.append(td_tag2);
        tr_tag.append(td_tag3);
        
        document.querySelector('#asteroid_body').append(tr_tag);
    }
}

function news(data) {
    data.forEach(element => {
        var card = document.createElement('div');
        var card_img = document.createElement('img');
        var card_body = document.createElement('div');
        var card_body2 = document.createElement('div');
        var card_body_title = document.createElement('h5');
        var card_body_text = document.createElement('p');
        var card_link = document.createElement('a');
        var card_main = document.createElement('div');

        card.className = 'mx-auto';
        card.style="width: 18rem; "
        card_img.className = 'card-img-top';
        card_body.className = 'card-body';
        card_body2.className = 'card-body';
        card_body_title.className = 'card-title';
        card_body_text.className = 'card-text';
        card_link.className = 'card-link';
        card_main.className = 'card card-body flex-fill';
        
        card_img.src = element.imageUrl;
        card_body_title.innerHTML = element.title;
        card_link.href = element.url;
        card_link.target = '_blank';
        card_body_text.innerHTML = element.summary;
        card_body2.innerHTML = `<b>News Site:</b> ${element.newsSite}`;

        card_link.append(card_body_title);
        card_body.append(card_link);
        card_body.append(card_body_text);
        card.append(card_img);
        card.append(card_body);
        card.append(card_body2);
        card_main.append(card);

        document.querySelector('#news').append(card_main);
    });

    for (let i = 0; i < document.querySelectorAll(".flex-fill").length; i++) {
        document.querySelectorAll(".flex-fill")[i].onmouseover = () => {
            document.querySelectorAll(".flex-fill")[i].style.borderColor = 'black';
        }
        document.querySelectorAll(".flex-fill")[i].onmouseout = () =>{
            document.querySelectorAll(".flex-fill")[i].style.borderColor = 'white';
        }
    }
}

function launches(data) {
    console.log(data);
    for (let i = 0; i < data.count; i++) {
        var tr_tag = document.createElement('tr');
        var th_tag = document.createElement('th');
        var td_tag1 = document.createElement('td');
        var td_tag2 = document.createElement('td');
        var td_tag3 = document.createElement('td');
        var td_tag4 = document.createElement('td');
        var td_tag5 = document.createElement('td');

        th_tag.scope = "row";
        th_tag.innerHTML = i + 1;
        td_tag1.innerHTML = data.result[i].name;
        td_tag2.innerHTML = data.result[i].date_str;
        td_tag3.innerHTML = data.result[i].provider.name;
        td_tag4.innerHTML = `${data.result[i].pad.location.name}, in ${data.result[i].pad.location.country}`;
        td_tag5.innerHTML = data.result[i].launch_description;
        
        tr_tag.append(th_tag);
        tr_tag.append(td_tag1);
        tr_tag.append(td_tag2);
        tr_tag.append(td_tag3);
        tr_tag.append(td_tag4);
        tr_tag.append(td_tag5);

        document.querySelector('#launches_body').append(tr_tag);
    }
}

function remove(id) {
    fetch(`http://127.0.0.1:8000/user_question`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrf_token
        },
        body: JSON.stringify({
            id: id
        })
    })

    location.reload()

}