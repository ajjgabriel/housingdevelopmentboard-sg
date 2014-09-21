package WhatsYourTimeNow

import (
    "html/template"
    "net/http"
)

func init() {
    http.HandleFunc("/", root)
}


func root(w http.ResponseWriter, r *http.Request) {
	
	timeEvent := "";
	
	
	whatsYourTimeNowForm.ExecuteTemplate(w, "housingdevelopmentboard-sg.htm", timeEvent);
}


var whatsYourTimeNowForm = template.Must(template.New("").ParseFiles("housingdevelopmentboard-sg.htm"))