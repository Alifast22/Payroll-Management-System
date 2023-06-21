export const Loginstart=(userCredentials)=>({
    type: "Login_Start"
});

export const LoginSucccess=(user)=>({
    type: "Login_Success",
    payload: user
});

export const LoginFailure=()=>({
    type: "Login_Failure"
});

export const Logout=()=>({
    type: "Logout"
});