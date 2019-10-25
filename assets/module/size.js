export default el =>{
  let element = document.querySelector(el)
  let w = element.getBoundingClientRect().width;
  let h = element.getBoundingClientRect().height;
  return {w, h}
}
