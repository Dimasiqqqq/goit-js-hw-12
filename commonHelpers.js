import{S as v,a as q,i as I}from"./assets/vendor-951421c8.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const m of t.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&l(m)}).observe(document,{childList:!0,subtree:!0});function o(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerpolicy&&(t.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?t.credentials="include":s.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(s){if(s.ep)return;s.ep=!0;const t=o(s);fetch(s.href,t)}})();const S="/goit-js-hw-12/assets/x-octagon-4a271e8a.svg",g=document.querySelector(".data-select"),y=document.querySelector(".gallery-list"),H=document.querySelector(".loader"),c=document.querySelector(".load-more"),h=document.querySelector(".end-message"),P="42133778-4b8d89235d578f5a93c0f41d5",A=new v(".gallery-list a",{captionsData:"alt",captionDelay:250});let i=1,f="";const r=15;let k=0;g.addEventListener("submit",async e=>{e.preventDefault();const n=g.elements.request.value.trim();if(f=n,!!n){i=1,y.innerHTML="",p();try{const o=await w(f,i);k=o.totalHits,o.totalHits>0?(L(o),o.hits.length<r&&d()):a("Sorry, there are no images matching your search query. Please try again!")}catch(o){b(o)}finally{p(),g.elements.request.value=""}}});async function w(e,n){const o={key:P,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:r,page:n},{data:l}=await q.get("https://pixabay.com/api/",{params:o});return l}function L(e){var s;const n=(s=document.querySelector(".gallery-item"))==null?void 0:s.getBoundingClientRect().height,o=e.hits.map(t=>`<li class="gallery-item">
          <a class="gallery-link" href="${t.largeImageURL}">
            <img
              class="gallery-image"
              src="${t.webformatURL}"
              alt="${t.tags}"
              width="360"
              height="200"
            />
            <ul class="info-list">
              <li class="info-item">
                <h2 class="item-title">Likes</h2>
                <p class="item-content">${t.likes}</p>
              </li>
              <li class="info-item">
                <h2 class="item-title">Views</h2>
                <p class="item-content">${t.views}</p>
              </li>
              <li class="info-item">
                <h2 class="item-title">Comments</h2>
                <p class="item-content">${t.comments}</p>
              </li>
              <li class="info-item">
                <h2 class="item-title">Downloads</h2>
                <p class="item-content">${t.downloads}</p>
              </li>
            </ul>
          </a>
        </li>`).join("");if(y.insertAdjacentHTML("beforeend",o),A.refresh(),e.hits.length>0){const t=n*(i-1)*r;window.scrollTo({top:t,behavior:"smooth"})}e.totalHits>0?e.hits.length<r||e.hits.length+(i-1)*r>=e.totalHits?(d(),u()):x():(u(),d())}function a(e){I.error({message:e,messageColor:"#FAFAFB",messageSize:"16",messageLineHeight:"20",position:"topRight",backgroundColor:"#EF4040",iconUrl:S,icon:"fa-regular",iconColor:"#FAFAFB",maxWidth:"500",transitionIn:"bounceInLeft"})}function b(e){e.message.includes("404")?a("Oops! The requested resource was not found."):e.message.includes("500")?a("Oops! Something went wrong on the server. Please try again later."):a("Oops! An unexpected error occurred. Please try again.")}function p(){H.classList.toggle("loader-active")}function x(){c.style.display="block",c.innerText="Load More Images"}function u(){c.style.display="none"}function d(){h.style.display="block",h.innerText="End of Image Collection"}c.addEventListener("click",async()=>{i++;try{const e=await w(f,i);e.totalHits>0?(L(e),(e.hits.length<r||e.hits.length+(i-1)*r>=e.totalHits)&&(d(),u())):u()}catch(e){b(e)}});
//# sourceMappingURL=commonHelpers.js.map
