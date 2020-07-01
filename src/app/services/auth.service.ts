import {Injectable} from '@angular/core';
import {FirebaseAuthentication} from '@ionic-native/firebase-authentication/ngx';
import {UserModel} from 'src/app/models/user.model';
import {STORAGE_KEY_USER} from 'src/app/hooks/storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    constructor(
        private firebase_authentication: FirebaseAuthentication
    ) {}

    register(email: string, password: string)
    {
        return new Promise<UserModel>(
            (resolve, reject) =>
            {
                this.firebase_authentication.createUserWithEmailAndPassword(email, password).then(
                    (res) => 
                    {
                        console.log("Success creates new user with firebase", res);
                        //set user model
                        let user: UserModel =
                        {
                            name: null,
                            email: email
                        }
                        resolve(user);
                    },
                    (err) =>
                    {
                        console.error("Fail on register new user with firebase", err);
                        reject(err);
                    }
                ).catch(
                    (error) => 
                    {
                        console.error("Fatal on register new user with firebase", error);
                        reject(error);
                    }
                );
            }
        );

    }

    login(email: string, password: string)
    {
        return new Promise<UserModel>(
            (resolve, reject) =>
            {
                this.firebase_authentication.signInWithEmailAndPassword(email, password).then(
                    (res) => 
                    {
                        console.log("Success login user with firebase", res);
                        this.firebase_authentication.getIdToken(false).then(
                            (res) =>
                            {
                                console.log("Success get token with firebase", res);
                                //set user model
                                let user: UserModel =
                                {
                                    name: null,
                                    email: email,
                                    token: res
                                }
                                //save local user
                                this.setUser(user);

                                resolve(user);
                            },
                            (err) =>
                            {
                                console.error("Fail on get token with firebase", err);
                                reject(err);
                            }
                        );
                    },
                    (err) =>
                    {
                        console.error("Fail on login with firebase", err);
                        reject(err);

                    }
                ).catch(
                    (error) => 
                    {
                        console.error("Fatal on login with firebase");
                        reject(error);

                    }
                );
            }
        );
    }

    logout()
    {
        return new Promise<any>(
            (resolve, reject) =>
            {
                this.firebase_authentication.signOut().then(
                    (res) =>
                    {
                        console.log("Success logout with firebase", res);
                        this.clearUser();
                        resolve(res);
                    },
                    (err) =>
                    {
                        console.error("Fail on logout with firebase", err);
                        reject(err);
                    }
                ).catch(
                    (error) => 
                    {
                        console.error("Fatal on login with firebase", error);
                        reject(error);
                    }
                );
            }
        );
    }

    reset(email: string)
    {
        this.firebase_authentication.sendPasswordResetEmail(email).then(
            (res) =>
            {
                console.log("Success send reset email with firebase", res);

            },
            (err) =>
            {
                console.error("Fail on send reset email with firebase", err);
            }
        ).catch(
            (error) => 
            {
                console.error("Fatal on send reset email with firebase", error);
            }
        );
    }

    getUser(): UserModel
    {
        let user: UserModel = null;
        let storageDate = localStorage.getItem(STORAGE_KEY_USER);
        if (storageDate)
        {
            let rawUser = JSON.parse(storageDate);
            if (rawUser)
            {
                user =
                {
                    name: rawUser.name,
                    email: rawUser.email
                }

            }
        }
        return user;
    }

    setUser(user: UserModel)
    {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        return this;
    }

    clearUser()
    {
        localStorage.removeItem(STORAGE_KEY_USER);
        return this;

    }

    isGranted()
    {
        return new Promise<any>(
            (resolve, reject) =>
            {
                if (this.getUser() === null)
                {
                    reject();
                }
                this.firebase_authentication.getIdToken(false).then(
                    (res) =>
                    {
                        resolve(true);
                    },
                    (err) =>
                    {
                        console.error("Fail on get token with firebase", err);
                        reject(err);
                    }
                );
            }
        );
    }
}
