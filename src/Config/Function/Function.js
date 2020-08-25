import firebaseApp from './../Firebase/Firebase'




// login 
const login = (data) => {
    return  dispatch => {
        firebaseApp.auth().signInWithEmailAndPassword(data.login_email, data.login_password).then(res => {
            dispatch({ type: "loginSuccess", payload: "*Login successfully !" })
        }).catch(error => {
            alert("sdfsf")
            console.log("error")
            
            dispatch({ type: "loginErr", payload:  error.code })
        })
    }
}


// Signup with email & password


// currentUser data
const currentUser = (user) => {
    console.log(user)
    return dispatch => {
        if(user !== null){
        var userData = firebaseApp.firestore().collection("Users").doc(user.uid);

        userData.get().then(function(doc) {
            let data = doc.data()
                dispatch({ type: "current_user", payload:data })
           
        })
    }
    
}
}

// logout 
const logout = () => {
    return dispatch => {
        firebaseApp.auth().signOut().then(res => {
        }).catch(res => {
        // An error happened.
        });
    }
}




export { login, logout, currentUser}