import Http from '../common/httpUtils';
import { SERVER, USERS_ENDPOINT, QUEUE_USER_MAP_ENDPOINT } from "../common/serverUrl";
import type { User, QueueUserMap } from './typesStore';

export const randomInt = (min = 0, max = 10000): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const getUsers = async () => {
    const URL = SERVER + USERS_ENDPOINT;
    const http = new Http;
    const result: { data: User[]; errorMessage: any } = await http.get(URL);
    return result;
}

export const getQueueUserMap = async () => {
    const URL = SERVER + QUEUE_USER_MAP_ENDPOINT;
    const http = new Http;
    const result: { data: QueueUserMap[]; errorMessage: any } = await http.get(URL);
    return result;
}