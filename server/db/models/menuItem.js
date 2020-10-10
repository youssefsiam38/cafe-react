const conn = require('../db.js');


class MenuItem {
  id;
  name;
  type;
  price;
  description;
  photoURL;

  constructor(name, type, price, description, photoURL) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.description = description;
    this.photoURL = photoURL;

  }
  static findByID = async (id) => {
    conn.connect();

    conn.resume()
  
    let [results, _] = await conn.promise().execute('SELECT * from menuItems where id=?;', [id]);
  
    conn.pause();

    return results[0];
  }

  static findAll = async () => {
    conn.connect();

    conn.resume()
  
    let [results, _] = await conn.promise().execute('SELECT * from menuItems;');
  
    conn.pause();
  
    return results;
  }

  static delete = async (id) => {

    try {

      conn.connect();

      conn.resume()
      let [results, _] = await conn.promise().execute('SELECT * from menuitems where id=? ;', [
        id
      ]);

      conn.execute('delete from menuItems where id=?;',[
        id
      ]);    
    
      conn.pause();
    
      return results[0];

    } catch (e) {
      console.log(e)
    }
  }
  save = async () => {

    try {
      

      if(!this.name, !this.photoURL, !this.price, !this.type, !this.description) {
        return {err: "must specify all attributes", data: null};
      }

      conn.connect();

      conn.resume()

      conn.execute('insert into menuItems (name, type, price, description, photoURL) values (?, ?, ?, ? , ?);',[
        this.name,
        this.type,
        this.price,
        this.description,
        this.photoURL
      ]);
    
      let [results, _] = await conn.promise().execute('SELECT * from menuitems order by id desc limit 1 ;');
    
      conn.pause();

      // loop over each property to check that the inserted to the db is the one that retrieved and if not don't return anything
      for (let key in results[0]) {
        // check and skip the id property
        if (results[0][key] != this[key] && key != 'id') {
          return console.log('something went wrong', results[0][key], this[key]);
        }
      }
    
      return results[0];

    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = MenuItem;