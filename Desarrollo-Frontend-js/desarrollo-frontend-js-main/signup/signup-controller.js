import { createUser } from "./signup-model.js";

export const signupController =  (signupForm) => {

  signupForm.addEventListener('submit', async (event) => {
    // evitamos la validación del form en el servidor, q es el comportamiento por defecto
    event.preventDefault();
    let existErrors = false;

    // obtenemos los datos del formulario
    const form = new FormData(signupForm)
    const email = form.get('email')
    const password = form.get('password')
    const passwordConfirm = form.get('password-confirm')


    // validar formato email
    const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const isEmailValid = emailRegExp.test(email)

    if (!isEmailValid) {
      existErrors = true
      alert('El email no es valido')
    }

    // validar passwords
    if (password !== passwordConfirm) {
      existErrors = true
      alert('Las contraseñas no son iguales')
    }

    if (!existErrors) {
      try {
        await createUser(email, password)
        // notificación OK + redirección
        // alert('user creado OK')
        const userCreatedEvent = new CustomEvent("userCreated", {
          detail: {
            message: "Te has registrado correctamente",
            type: "success"
          }
        })
        signupForm.dispatchEvent(userCreatedEvent);
        setTimeout(() => {
          window.location = '/'
        }, 1500);
      } catch (error) {
        // notificación KO - motivo
        // alert(error.message)
        const userNotCreatedEvent = new CustomEvent("userNotCreated", {
          detail: {
            message: error.message,
            type: "error"
          }
        })
        signupForm.dispatchEvent(userNotCreatedEvent);
      }
    }

  })


}