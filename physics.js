(function(root){
 const R=Math.PI/180,clamp=x=>Math.max(-1,Math.min(1,x));
 function declination(position,tilt){return Math.asin(Math.sin(tilt*R)*Math.sin(position*R))/R}
 function calculate(position,tilt,latitude,time=12){
  const dec=declination(position,tilt),p=latitude*R,d=dec*R;
  const a=Math.sin(p)*Math.sin(d),b=Math.cos(p)*Math.cos(d);
  let hours;
  if(Math.abs(b)<1e-12)hours=a>1e-12?24:a< -1e-12?0:12;
  else {const c=-a/b;hours=c<=-1?24:c>=1?0:24*Math.acos(c)/Math.PI}
  const H=(time-12)*15*R,alt=Math.asin(clamp(a+b*Math.cos(H)))/R;
  const east=-Math.cos(d)*Math.sin(H),north=Math.cos(p)*Math.sin(d)-Math.sin(p)*Math.cos(d)*Math.cos(H);
  const az=(Math.atan2(east,north)/R+360)%360;
  const noon=90-Math.abs(latitude-dec);
  return{dec,hours,noon,alt,az,energy:Math.max(0,Math.sin(noon*R))*100,rise:12-hours/2,set:12+hours/2};
 }
 const api={calculate,declination};root.Seasons=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
