function Register(){
    let user = document.getElementById("Username").value.trim();
    let email = document.getElementById("emailid").value.trim();
    let pass = document.getElementById("Userpassword").value.trim();
    let confirm = document.getElementById("Confirmpassword").value.trim();

    if (!user || !email || !pass || !confirm){
        alert("Please fill the fields");
        return;
    }

    if (pass != confirm){
        alert("Please enter correct confirm password");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const id = "USR" + String(users.length + 1).padStart(3, "0");
    let userexists = users.find(use => use.username === user);
    if (userexists){
        alert("Username already exists.")
        return;
    }

    users.push({
        id: id,
        username: user,
        email: email,
        password: pass,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account registered successfully!");
    window.location.href = "index.html";
}


function Login(){
    let username = document.getElementById("Uname").value.trim();
    let password = document.getElementById("password").value.trim();
    let role = document.getElementById("role").value.trim();

    if (role === "admin") {
        if (username === "admin" && password === "admin123") {
            localStorage.setItem("role", "admin");
            alert("Admin Login Successful");
            window.location.href = "admin.html";
        } else {
            alert("Invalid Admin Credentials");
        }
    }

    else if (role === "user") {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        let validUser = users.find(user =>
            user.username === username && user.password === password
        );

        if (validUser) {
            localStorage.setItem("role", "user");
            localStorage.setItem("loggedInUser", username);
            localStorage.setItem("currentUser", validUser.email);
            alert("User Login Successful");
            window.location.href = "user.html";
        } else {
            alert("Invalid User Credentials");
        }
    }
}

//  CHECK AUTH
function checkAuth(requiredRole) {
    const role = localStorage.getItem("role");

    if (role !== requiredRole) {
        alert("Access Denied!");
        window.location.href = "index.html";
    }
}


//  LOGOUT
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            Logout();
        });
    }
});

function Logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}