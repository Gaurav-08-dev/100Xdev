import { atom } from "recoil";
export const jobAtom = atom({
  key: "jobs",
  default: 100,
});
export const myNetworkAtom = atom({
  key: "myNetwork",
  default: 69,
});

export const messagingAtom = atom({
  key: "messaging",
  default: 90,
});

export const notificationsAtom = atom({
  key: "notification",
  default: 0,
});


export const notifications  = atom({
    key:"networkAtom",
    default:{
        
    }
})