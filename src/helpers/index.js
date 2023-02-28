
export const ellipsis = (nb , str)=>{
  return str.length > nb ? str.slice(0,nb)+'...' : str
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateName =(name)=>{
  const regName = /^([a-zA-Z]{2}[a-zA-Z]+ )+$/;
  // if(!regName.test(name)){
  //     return false;
  // }else{
  //     return true;
  // }
  if(name.length > 3){
    return true
  }
  return false
}