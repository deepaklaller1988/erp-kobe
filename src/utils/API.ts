// import User from "./User";
// import Error from "./Error";
// import { handleError } from "../lib/errorHandler";

export interface Res {
  success: boolean;
  status: number;
  resent: boolean;
  resend: Function;
  [key: string]: any;
}

class API {
  static token: string = "";

  static setToken(token: string) {
    this.token = token;
  }

  static async get(
    path: string | string[],
    resent: boolean = false
  ): Promise<Res> {
    return new Promise(async (resolve, reject) => {
      if (Array.isArray(path)) path = path.join("/");

      let headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      if (this.token) {
        headers.append("Authorization", `Bearer ${this.token}`);
      }
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + path, {
          method: "GET",
          credentials: "include",
          headers: headers,
        });

        const parsed = await this.parseRes(
          response,
          () => this.get(path, true),
          resent,
          path
        );

        resolve(parsed);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  static async post(
    path: string | string[],
    body: any,
    resent: boolean = false
  ): Promise<Res> {
    return new Promise(async (resolve, reject) => {
      if (Array.isArray(path)) path = path.join("/");

      let headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      if (this.token) {
        headers.append("Authorization", `Bearer ${this.token}`);
      }

      console.log(process.env.REACT_APP_API_URL, path, "=======")
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + path, {
          method: "POST",
          credentials: "include",
          headers: headers,
          body: JSON.stringify(body),
        });

        const parsed = await this.parseRes(
          response,
          () => this.post(path, body, true),
          resent,
          path
        );



          resolve(parsed);
      } catch (error: any) {
        reject(error);
        //  handleError(error.code);
      }
    });
  }


  static async postFile(
    path: string | string[],
    body: any,
    resent: boolean = false
  ): Promise<Res> {
    return new Promise(async (resolve) => {
      // Join path array
      if (Array.isArray(path)) path = path.join("/");

      let headers = new Headers();

      if (localStorage.getItem("token")) {
        headers.append(
          "Authorization",
          `Bearer ${localStorage.getItem("token")}`
        );
      }

      await fetch(process.env.REACT_APP_API_URL + path, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: body,
      })
        .then(async (res: Response) => {
          let parsed = await this.parseRes(
            res,
            () => this.post(path, body, true),
            resent,
            path
          );

          // if (Process.isDev) console.log("POST", path, "\n", parsed);

          resolve(parsed);
        })
        .catch((err: any) => {
          // if (err.status == undefined) {
          //   // Route.load("/maintenance");
          // }
          console.error(err);
        });
    });
  }

  static async put(
    path: string | string[],
    body: any,
    resent: boolean = false
  ): Promise<Res> {
    return new Promise(async (resolve) => {
      if (Array.isArray(path)) path = path.join("/");

      let headers = new Headers();

      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      if (localStorage.getItem("token")) {
        headers.append(
          "Authorization",
          `Bearer ${localStorage.getItem("token")}`
        );
      }

      await fetch(process.env.REACT_APP_API_URL + path, {
        method: "PUT",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then(async (res: Response) => {
          let parsed = await this.parseRes(
            res,
            () => this.post(path, body, true),
            resent,
            path
          );

          // if (Process.isDev) console.log("PUT", path, "\n", parsed);

          resolve(parsed);
        })
        .catch((err: any) => {
          // if (err.status == undefined) {
          //   // Route.load("/maintenance");
          // }
          console.error(err);
        });
    });
  }

  static async delete(
    path: string | string[],
    body: any,
    resent: boolean = false
  ): Promise<Res> {
    return new Promise(async (resolve) => {
      // Join path array
      if (Array.isArray(path)) path = path.join("/");

      let headers = new Headers();

      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      if (localStorage.getItem("token")) {
        headers.append(
          "Authorization",
          `Bearer ${localStorage.getItem("token")}`
        );
      }

      await fetch(process.env.REACT_APP_API_URL + path, {
        method: "DELETE",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then(async (res: Response) => {
          let parsed = await this.parseRes(
            res,
            () => this.post(path, body, true),
            resent,
            path
          );

          // if (Process.isDev) console.log("DELETE", path, "\n", parsed);

          resolve(parsed);
        })
        .catch((err: any) => {
          // if (err.status == undefined) {
          //   // Route.load("/maintenance");
          // }
          console.error(err);
        });
    });
  }

  static async parseRes(
    raw: Response,
    resend: Function,
    resent: boolean,
    path: string | string[]
  ): Promise<Res> {
    // try {
      let res: Res = await raw.json();
      res.success = raw.status >= 200 && raw.status < 300;
      res.status = raw.status;
      res.resend = resend;
      res.resent = resent;
      console.log("res",res)
      return res;

    } catch (error:any) {
      console.error("Error parsing response:", error);
    //   throw error;

    }
  }



export default API;
// export function post(arg0: string, userData: { type: string; name: string; email: string; password: string; }) {
//   throw new Error("Function not implemented.");
// }

