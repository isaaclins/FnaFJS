import*as e from"https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";(function(){const m=document.createElement("link").relList;if(m&&m.supports&&m.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))b(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&b(u)}).observe(document,{childList:!0,subtree:!0});function T(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function b(t){if(t.ep)return;t.ep=!0;const n=T(t);fetch(t.href,n)}})();const c=new e.Scene,y=new e.PerspectiveCamera(80,window.innerWidth/window.innerHeight,.1,1e3),w=new e.WebGLRenderer;w.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(w.domElement);const G=new e.MeshBasicMaterial({color:4473924}),M=new e.Mesh(new e.PlaneGeometry(10,10),G);M.rotation.x=Math.PI/2;M.position.y=2.5;c.add(M);const I=new e.MeshBasicMaterial({color:4473924}),s=new e.Mesh(new e.PlaneGeometry(2.5,10),I);s.rotation.y=Math.PI/2;s.position.x=-5;s.position.y=-2.5;s.position.z=-3.75;c.add(s);const W=new e.MeshBasicMaterial({color:4473924}),l=new e.Mesh(new e.PlaneGeometry(2.5,10),W);l.rotation.y=-Math.PI/2;l.position.x=5;l.position.y=-2.5;l.position.z=-3.75;c.add(l);let P=s.position.y,x=l.position.y,i=0,D=0,g=!1,f="open",h="open";function A(){P=-2.5,i+=1}function O(){P=15,i-=1}function B(){x=-2.5,i+=1}function H(){x=15,i-=1}const L=new e.MeshBasicMaterial({color:5592405}),R=new e.MeshBasicMaterial({color:3355443}),E=new e.Mesh(new e.PlaneGeometry(10,5),L);E.position.z=-5;c.add(E);const v=new e.Mesh(new e.PlaneGeometry(5,5),L);v.rotation.y=Math.PI/2;v.position.x=-5;c.add(v);const C=new e.Mesh(new e.PlaneGeometry(5,5),L);C.rotation.y=-Math.PI/2;C.position.x=5;c.add(C);const S=new e.Mesh(new e.PlaneGeometry(10,10),R);S.rotation.x=-Math.PI/2;S.position.y=-2.5;c.add(S);y.position.z=0;y.position.y=0;document.addEventListener("mousemove",r=>{D=-(r.clientX/window.innerWidth*2-1)*Math.PI/4});const o=document.createElement("div");o.id="cameraScreen";o.style.position="fixed";o.style.top="0";o.style.left="0";o.style.width="100%";o.style.height="100%";o.style.backgroundColor="black";o.style.opacity="0";o.style.display="flex";o.style.alignItems="center";o.style.justifyContent="center";o.style.color="white";o.style.fontSize="2em";o.style.transition="opacity 1s";o.innerText="CAMERA FEED";document.body.appendChild(o);let a=document.createElement("div");a.id="powerConsumptionLevelText";a.style.position="fixed";a.style.bottom="0";a.style.left="0";a.style.color="white";a.style.fontSize="2em";document.body.appendChild(a);let d=document.createElement("div");d.id="powerPercentage";d.style.position="fixed";d.style.bottom="0";d.style.right="0";d.style.color="white";d.style.fontSize="2em";document.body.appendChild(d);let p=document.createElement("div");p.id="inGameTime";p.style.position="fixed";p.style.top="0.5em";p.style.left="0.5em";p.style.color="white";p.style.fontSize="2em";p.innerText="12:00PM";document.body.appendChild(p);setInterval(()=>{console.log("hello")},1e3);function K(){d.innerText="Power Percentage: "+Math.floor(i/10*100)+"%"}document.addEventListener("keydown",r=>{r.code==="Space"&&(g?(o.style.opacity="0",g=!1,i-=1):(o.style.opacity="1",g=!0,i+=1)),r.code==="KeyA"&&(f==="open"?(A(),f="closed",console.log("left door closed")):f==="closed"&&(O(),f="open",console.log("left door open"))),r.code==="KeyD"&&(h==="open"?(B(),h="closed",console.log("right door closed")):h==="closed"&&(H(),h="open",console.log("right door open"))),r.code==="KeyW"&&(i.innerText="Power Consumption Level: "+i)});function z(){requestAnimationFrame(z),console.log(i),a.innerText="Power Consumption Level: "+i,K(),y.rotation.y=D;const r=.05;s.position.y+=(P-s.position.y)*r,l.position.y+=(x-l.position.y)*r,w.render(c,y)}z();window.addEventListener("resize",()=>{y.aspect=window.innerWidth/window.innerHeight,y.updateProjectionMatrix(),w.setSize(window.innerWidth,window.innerHeight)});
