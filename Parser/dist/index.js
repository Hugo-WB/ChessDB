"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const ParseAndUpload_1 = require("./ParseAndUpload");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new graphql_request_1.GraphQLClient("http://localhost:4000/graphql");
        yield ParseAndUpload_1.parseAndUploadFolder("./assets/PgnMentor/players/", client);
    }
    catch (error) {
        console.log(error);
    }
});
main();
//# sourceMappingURL=index.js.map