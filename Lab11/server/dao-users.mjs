/* Data Access Object (DAO) module for accessing users data */

import db from "./db.mjs";
import crypto from 'crypto';


// NOTE: all functions return error messages as json object { error: <string> }
export default function UserDao() {

    // This function retrieves one user by id
    this.getUserById= (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id=?';
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                if (row === undefined) {
                    resolve({error: 'User not found.'});
                } else {
                    resolve(row);
                }
            });
        });
    };

    this.getUser= (email, password) => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM users WHERE email = ?';
          db.get(sql, [email], (err, row) => {
            if (err) { 
              reject(err); 
            }
            else if (row === undefined) { 
              resolve(false); 
            }
            else {
              const user = {id: row.id, username: row.email, name: row.name};
              
              crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
                if (err) reject(err);
                if(!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword))
                  resolve(false);
                else
                  resolve(user);
              });
            }
          });
        });
      };
}
