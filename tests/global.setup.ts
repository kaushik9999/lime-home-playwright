import { FullConfig,test } from "@playwright/test";
import dotenv from "dotenv";

async function globalSetup(config: FullConfig) {
    if(process.env.test_env){
        dotenv.config({
            path:`./env/.env.${process.env.test_env}`,
            override:true
        });
    }
}

export default globalSetup;