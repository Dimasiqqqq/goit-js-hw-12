import{S as b,a as v,i as S}from"./assets/vendor-951421c8.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const q="/goit-js-hw-12/assets/x-octagon-4a271e8a.svg",u=document.querySelector(".data-select"),f=document.querySelector(".gallery-list"),m=document.querySelector(".loader"),h=document.querySelector(".load-more"),P=document.querySelector(".end-message"),A="42133778-4b8d89235d578f5a93c0f41d5",F=new b(".gallery-list a",{captionsData:"alt",captionDelay:250});let i=1,d="";const l=15;let k=0;u.addEventListener("submit",async e=>{e.preventDefault();const a=u.elements.request.value.trim();if(d=a,!!a){i=1,f.innerHTML="",m.classList.toggle("loader-active");try{const s=await y(d,i);k=s.totalHits,s.totalHits>0?(p(s),s.hits.length<l?w():n("Sorry, there are no images matching your search query. Please try again!")):n("Sorry, there are no images matching your search query. Please try again!")}catch(s){L(s)}finally{m.classList.toggle("loader-active"),u.reset()}}});async function y(e,a){const s={key:A,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:l,page:a},{data:o}=await v.get("https://pixabay.com/api/",{params:s});return o}function p(e){const a=document.querySelector(".gallery-item").getBoundingClientRect().height,s=e.hits.map(o=>`<li class="gallery-item">
          <a class="gallery-link" href="${o.largeImageURL}">
            <img
              class="gallery-image"
              src="${o.webformatURL}"
              alt="${o.tags}"
              width="360"
              height="200"
            />
            <ul class="info-list">
              <li class="info-item">
                <h2 class="item-title">Likes</h2>
                <p class="item-content">${o.likes}</p>
              </li>
              <li class="info-item">
                <h2 class="item-title">Views</h2>
                <p class="item-content">${o.views}</p>
              </li>
              <li class="info-item">
                <h2 class="item-title">Comments</h2>
                <p class="item-content">${o.comments}</p>
              </li>
              <li class="info-item">
                <h2 class="item-title">Downloads</h2>
                <p class="item-content">${o.downloads}</p>
              </li>
            </ul>
          </a>
        </li>`).join("");f.insertAdjacentHTML("beforeend",s),F.refresh(),window.scrollBy({top:a*l,behavior:"smooth"})}function n(e){S.error({message:e,messageColor:"#FAFAFB",messageSize:"16",messageLineHeight:"20",position:"topRight",backgroundColor:"#EF4040",iconUrl:q,icon:"fa-regular",iconColor:"#FAFAFB",maxWidth:"500",transitionIn:"bounceInLeft"})}function L(e){e.message.includes("404")?n("Oops! The requested resource was not found."):e.message.includes("500")?n("Oops! Something went wrong on the server. Please try again later."):n("Oops! An unexpected error occurred. Please try again.")}function g(){h.style.display="none"}function w(){P.style.display="block"}h.addEventListener("click",async()=>{i++;try{const e=await y(d,i);e.totalHits>0?(p(e),e.hits.length<l&&(w(),g())):g()}catch(e){L(e)}});
//# sourceMappingURL=commonHelpers.js.map
