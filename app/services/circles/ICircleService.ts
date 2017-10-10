import { User } from "domain/users";
import { Circle, UserFollower } from "domain/circles";

/**
 * Circle service interface
 * 
 * @export
 * @interface ICircleService
 */
export interface ICircleService {

    addCircle: (userId: string, circle: Circle) => Promise<string>;
    addFollowingUser: (userId: string, circleId:string, userCircle: User, userFollower: UserFollower, userFollowingId: string) => Promise<void>;
    deleteFollowingUser: (userId: string, circleId: string,userFollowingId: string) => Promise<void>;
    updateCircle: (userId: string, circle: Circle, circleId: string) => Promise<void>;
    deleteCircle: (circleId: string, userId: string) => Promise<void>;
    getCircles: () => Promise<{ [circleId: string]: Circle }>;
    getCirclesByUserId: (userId: string) => Promise<{ [circleId: string]: Circle }>;
}