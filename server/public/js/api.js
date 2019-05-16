// wrap in IIFE to control scope
(function () {

    const baseURL = 'http://localhost:8080';

    function testAPIs() {
        // test list first
        var testId = '';
        var testJSON = {};

        // list
        callAPI('GET', '/api/rentalShop', null, null)
            .then((list) => {
                console.log('\n\n***************************\nlist results:');
                console.log(list);
                testId = list[0]._id;

                // create
                let formData = new FormData(document.getElementById('formId'))
                callAPI('POST', '/api/rentalShop/create', null, formData)
                    .then((equipment) => {
                        equipment_id = equipment._id;
                        savedEquipment = equipment; // keep a handle to the created photo object
                        console.log('\n\n***************************\ncreate results:');
                        console.log(equipment);

                        // find
                        callAPI('GET', '/api/rentalShop/' + equipment_id, null, null)
                            .then((equipment) => {
                                console.log('\n\n***************************\nfind results:');
                                console.log(equipment);

                                // update
                                testJSON.description += 'appended by the AJAX API';
                                callAPI('PUT', '/api/rentalShop/update/' + equipment_id, null, savedEquipment)
                                    .then((equipment) => {
                                        console.log('\n\n***************************\nupdate results:');
                                        console.log(equipment);

                                        //delete
                                        callAPI('DELETE', '/api/rentalShop/delete/' + equipment_id, null, null)
                                            .then((result) => {
                                                console.log('\n\n***************************\ndelete result:');
                                                console.log(result);
                                            })
                                    });
                            });
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    }


    async function callAPI(method, uri, params, body) {
        jsonMimeType = {
            'Content-type': 'application/json'
        }
        try {
            /*  Set up our fetch.
             *   'body' to be included only when method is POST
             *   If 'PUT', we need to be sure the mimetype is set to json
             *      (so bodyparser.json() will deal with it) and the body
             *      will need to be stringified.
             *   '...' syntax is the ES6 spread operator.
             *      It assigns new properties to an object, and in this case
             *      lets us use a conditional to create, or not create, a property
             *      on the object. (an empty 'body' property will cause an error
             *      on a GET request!)
             */
            var response = await fetch(baseURL + uri, {
                method: method, // GET, POST, PUT, DELETE, etc.
                ...(method == 'POST' ? {
                    body: body
                } : {}),
                ...(method == 'PUT' ? {
                    headers: jsonMimeType,
                    body: JSON.stringify(body)
                } : {})
            });
            return response.json(); // parses response to JSON
        } catch (err) {
            console.error(err);
            return "{'status':'error'}";
        }
    }

    // Calls our test function when we click the button
    document.querySelector('#testme').addEventListener("click", () => {
        var formdata = document.getElementById(formId);
        let input = document.getElementById('name')
        if (input.value) {
            testAPIs();
        } else {
            alert("please select an image file first");
        }
    });
})();