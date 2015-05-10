package WhatsYourTimeNow

import (
    "html/template"
    "net/http"
	"math"
)

func init() {
    http.HandleFunc("/", root)
}


func root(w http.ResponseWriter, r *http.Request) {
	
	var arrayIntersect [2]int = interectCircle(1,1,1,1);
	
	whatsYourTimeNowForm.ExecuteTemplate(w, "housingdevelopmentboard-sg.htm", arrayIntersect);
}

func interectCircle(x1 float64, y1 float64,x2 float64, y2 float64) [2]int {
	var x float64 = x1 - x2;
	var y float64 = y1 - y2;
	var distanceBetweenCenters float64 = math.Sqrt(math.Pow(2, x) + math.Pow(2,y));
	
	var sumOfRadiusOneKm float64 = 2;
	var sumOfRadiusTwoKm float64 = 4;
	var arrayIntersect [2]int
	if(distanceBetweenCenters <= sumOfRadiusOneKm){
	
		arrayIntersect[0] = 1;
	}
	
	if(distanceBetweenCenters <= sumOfRadiusTwoKm){
	
		arrayIntersect[1] = 1;
	}
	
	return arrayIntersect;
	
}


var whatsYourTimeNowForm = template.Must(template.New("").ParseFiles("housingdevelopmentboard-sg.htm"))