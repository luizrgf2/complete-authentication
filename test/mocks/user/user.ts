import { UserInterface } from "../../../src/app/core/entities/user";

export const  UserValid =  {
    email:"teste@gmail.com",
    password:"Teste123",
    name:"Felipe Ramos",
    accountConfirmed:true
} as UserInterface


export const  UserWithConfirmationFalse=  {
    email:"teste@gmail.com",
    password:"Teste123",
    name:"Felipe Ramos",
    accountConfirmed:false
} as UserInterface

export const  UserWithoutConfirmation=  {
    email:"teste@gmail.com",
    password:"Teste123",
    name:"Felipe Ramos",
} as UserInterface

export const  UserWithInvalidEmail =  {
    email:"testegmail.com",
    password:"Teste123",
    name:"Felipe Ramos",
    accountConfirmed:true
} as UserInterface

export const  UserWithInvalidPassword =  {
    email:"teste@gmail.com",
    password:"Teste",
    name:"Felipe Ramos",
    accountConfirmed:true
} as UserInterface

export const  UserWithInvalidName =  {
    email:"teste@gmail.com",
    password:"Teste123",
    name:"Fel",
    accountConfirmed:true
} as UserInterface

export const  UserWithWithoutName =  {
    email:"teste@gmail.com",
    password:"Teste123",
    accountConfirmed:true
} as UserInterface

export const  UserWithWithoutEmail =  {
    password:"Teste123",
    name:"Luiz Fellipe",
    accountConfirmed:true
} as UserInterface

export const  UserWithoutPassword =  {
    email:"teste@gmail.com",
    name:"Luiz Fellipe",
    accountConfirmed:true
} as UserInterface

