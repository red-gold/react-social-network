// - Import react components
import { firebaseRef, firebaseAuth } from 'app/firebase/';

import { IAuthorizeService } from "services/authorize";
import { User } from "Domain/users";
import { LoginUser, RegisterUserResult } from "domain/authorize";
import { SocialError } from "domain/common";

/**
 * Firbase authorize service
 * 
 * @export
 * @class AuthorizeService
 * @implements {IAuthorizeService}
 */
export class AuthorizeService implements IAuthorizeService {

    /**
     * Login the user
     * 
     * @returns {Promise<LoginUser>}
     * @memberof IAuthorizeService
     */
    public login: (email: string, password: string) => Promise<LoginUser> = (email, password) => {

        return new Promise<LoginUser>((resolve, reject) => {
            firebaseAuth()
                .signInWithEmailAndPassword(email, password)
                .then((result) => {
                    resolve(new LoginUser(result.uid));
                })
                .catch((error: any) => {
                    reject(new SocialError(error.code, error.message));
                })
        });
    };

    /**
    * Logs out the user
    *
    * @returns {Promise<void>}
    * @memberof IAuthorizeService
    */
    public logout: () => Promise<void> = () => {
        return new Promise<void>((resolve, reject) => {
            firebaseAuth()
                .signOut()
                .then((result) => {
                    resolve();
                })
                .catch((error: any) => {

                    reject(new SocialError(error.code, error.message));
                })
        });
    }

    /**
    * Register a user
    *
    * @returns {Promise<void>}
    * @memberof IAuthorizeService
    */
    public registerUser: (user: User) => Promise<RegisterUserResult> = (user) => {
        return new Promise<RegisterUserResult>((resolve, reject) => {
            firebaseAuth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((signupResult) => {
                    firebaseRef.child(`users/${signupResult.uid}/info`)
                        .set({
                            ...user,
                            avatar: 'noImage'
                        })
                        .then((result) => {
                            resolve(new RegisterUserResult(signupResult.uid));
                        })
                        .catch((error: any) => reject(new SocialError(error.name, error.message)));
                })
                .catch((error: any) => reject(new SocialError(error.code, error.message)));
        });
    }

    /**
    * Update user password
    *
    * @returns {Promise<void>}
    * @memberof IAuthorizeService
    */
    public updatePassword: (newPassword: string) => Promise<void> = (newPassword) => {
      console.log('====================================');
      console.log("update password");
      console.log('====================================');
        return new Promise<void>((resolve, reject) => {
            var user = firebaseAuth().currentUser;
            console.log('====================================');
            console.log(user);
            console.log('====================================');
                if (user) {
                    user.updatePassword(newPassword).then(() => {
                        // Update successful. 
                            resolve();
                    }).catch((error: any) => {
                        // An error happened.
                        reject(new SocialError(error.code, error.message));
                    });
                }

        });
    }


}