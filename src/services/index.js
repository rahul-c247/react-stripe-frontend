import ApiHelper from "../axios";

export async function AuthSignup (data){
    const url = '/registration';
  
    const response = await ApiHelper.post(url, data);
  
    return response;
}