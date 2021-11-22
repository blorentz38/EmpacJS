/** EmpacJS Application
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/

window.onload = function() {
	
	// Set up testing multicolumn
	const testMulti = new MultiColumn(3);
	
	// Append to body
	// document.body.append(testModule.returnMarkup());
	document.body.append(testMulti.returnMarkup());

}

/** Function that saves data to the server */
async function saveData(){
	
	// Set up basic hero
	const testModule = new Container();
	
	let testHeadline = new Headline('h1');
	testHeadline.setContent('This is a data-driven module.');
	
	let testPara = new Paragraph();
	testPara.setContent('This module was brought in using a JSON object. Woo!');
	
	testModule.addElement(testHeadline);
	testModule.addElement(testPara);
	
	// Testing write to the server
	let myPromise = new Promise(function(resolve){
		try{
			$.post( "../files/templates/write_json.php", { 
				json: testModule.returnJSON(), 
				file: 'test.json',
				}
			);
			resolve(console.log('Submission Success.'));
		} catch(e) {
			resolve(console.log('Submission Failed.'));
		}
	})
}

/** Function that gets data from the server */
async function getData(theData, theComponent, theObject){
	return new Promise(function(resolve){
		let newRequest = new XMLHttpRequest();
		newRequest.open('GET', '../files/templates/components/' + theData, true);
		newRequest.setRequestHeader('Content-Type', 'application/json');
		newRequest.responseType = 'json';

		// Handle the onload event
		newRequest.onload = function(){ 
			let tempData = newRequest.response;
			for(let e = 0; e < tempData.elements.length; e++){
				let newElement = handleData(tempData.elements[e]);
				theComponent.addElement(newElement);
			};
			resolve( theObject.append(theComponent.returnMarkup()) );
		}

		// Send Request
		newRequest.send();
	});
}

/** Function that handles data driven components */
function handleData(theData){
	let newChild;
	if(theData.type == 'Headline'){
		newChild = new Headline(theData.tag);
		newChild.setContent(theData.content);
	} else if (theData.type == 'Paragraph'){
		newChild = new Paragraph();
		newChild.setContent(theData.content);
	}
	return newChild.returnMarkup();
}