/**
 * KOMMENTAR
 * + SQL-Anfragen von hier geladen.
 * + app.get = GET ; app.post = POST 
 */

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Ohne funktionieren die POST-Request irgendwie nicht 
// Jedenfalls ueber POSTMAN
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/**
 * Funktionierende Queries
 */

const QUERY_SELECT_REZEPTUEBERSICHT = "SELECT * FROM Rezepte"; // alle rezepte werden geladen fuer die uebersicht
const QUERY_SELECT_KATEGORIEN_ZU_REZEPT = "SELECT Kategorie, k.KID FROM Kategorien k JOIN KategorieZuRezept kzr ON kzr.KID=k.KID WHERE RID = ?"; // es werden die kategorien fuer ein rezept geladen
const QUERY_SELECT_REZEPT = "SELECT * FROM Rezepte WHERE RID = ?"; // einzelnes Rezept wird geladen
const QUERY_INSERT_REZEPT = "INSERT INTO Rezepte (RID, Titel, Beschreibung, Zutaten, Bildpfad, erstelldatum, BID) VALUES (null,?,?,'',?,CURRENT_TIMESTAMP,?)"; // Rezept wird hinzugefuegt
const QUERY_INSERT_KATEGORIEN_ZU_REZEPT = "INSERT INTO KategorieZuRezept (KRID, KID, RID) VALUES (null,?,?)"; // muss in einem request mit QUERY_INSERT_REZEPT sein
const QUERY_UPDATE_REZEPT = "UPDATE Rezepte SET Titel=?, Beschreibung=?, Bildpfad=? WHERE RID=?"; // Wenn Benutzer Rezept editiert
const QUERY_DELETE_REZEPT = "DELETE FROM Rezepte WHERE RID=?"; // Wenn Benutzer Rezept loescht
const QUERY_SELECT_ALLE_KATEGORIEN = "SELECT * FROM Kategorien ORDER BY Kategorie"; // Laedt alle existierenden Kategorien
const QUERY_SELECT_SEARCH_REZEPTE = "SELECT * FROM Rezepte WHERE Titel LIKE "; // Sucht alle Rezepte, wo Titel mit Suchbegriff uebereinstimmt
const QUERY_SELECT_REZEPTE_ZU_KATEGORIE = "SELECT r.RID, r.Titel, r.Beschreibung, r.Bildpfad, r.erstelldatum, r.BID FROM Kategorien k JOIN KategorieZuRezept kzr ON kzr.KID=k.KID JOIN Rezepte r ON kzr.RID = r.RID WHERE k.KID=?"; // Fuer die suche nach Kategorien


// Noch nicht getestete Queries

const QUERY_CHECK_BENUTZER = 'SELECT * FROM Benutzer WHERE Benutzername = ? AND Passwort = ? LIMIT 1'; // Abfrage ob Benutzername und Passwort korrekt
const QUERY_SELECT_KRIDS_ZU_REZEPT = "SELECT KRID FROM Kategorien k JOIN KategorieZuRezept kzr ON kzr.KID=k.KID WHERE RID = ?";
const QUERY_DELETE_KATEGORIEZUREZEPT = "DELETE FROM KategorieZuRezept WHERE KRID IN (";

// Queries fuer die Suche
const QUERY_SUCHE_BASIS = "SELECT * FROM Rezepte WHERE Titel LIKE ";
const QUERY_SUCHE_DATUMVON = " AND erstelldatum >= ";
const QUERY_SUCHE_DATUMBIS = " AND erstelldatum <= ";
const QUERY_SUCHE_TAGS = "SELECT DISTINCT r.RID, r.Titel, r.Beschreibung, r.Bildpfad, r.erstelldatum, r.BID FROM Kategorien k JOIN KategorieZuRezept kzr ON kzr.KID=k.KID JOIN Rezepte r ON kzr.RID = r.RID WHERE k.KID= ";
const QUERY_SUCHE_BEGRIFF = " AND r.Titel LIKE";

/**
 * Datenbank
 */

// [TODO] Auslagern und zu ENV Variablen machen
const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: '4itPUDAJyX',
  password: 'UKljbaExKi',
  database: '4itPUDAJyX'
});

// Connected die Datenbank
connection.connect(function(err){
  (err)? console.log(err): console.log('Datenbank connected: ' + connection.config.database);
});


/**
 * Request-Verarbeitung
 */

// TODO in das Datumsformat biegen, sonst geht Datumssuche nicht
app.post('/api/filtersuche', function(req, res){
  console.log(req.body);

  const { suche } = req.body;
  const { begriff, datumvon, datumbis, kategorien } = suche;
  var sql;
  var anhang = "";
  var kids = "";

  if(kategorien.length === 0){
    sql = QUERY_SUCHE_BASIS;

    if(datumvon !== "undefined"){
      anhang += QUERY_SUCHE_DATUMVON + "'" + datumvon + "'";
    }

    if(datumbis !== "undefined"){
      anhang += QUERY_SUCHE_DATUMBIS + "'" + datumbis + "'";
    }

    connection.query(sql + connection.escape('%'+ begriff + '%') + anhang,(err, result, _) => {
      if ( err ){
        console.log(err);
        res.json({error: 'Fehler beim Suchen'});
        return;
      }
    
      res.send(result);
    });
  } 
  // Tags sind aktiviert
  else {
    sql = QUERY_SUCHE_TAGS;

    kategorien.forEach(function(i, idx, array){
      kids += i;
      
      if (idx !== array.length -1){
        kids +=" OR k.KID = ";
      }
    });

    sql += kids + QUERY_SUCHE_BEGRIFF;

    if(datumvon !== "undefined"){
      anhang += QUERY_SUCHE_DATUMVON + "'" + datumvon + "'";
    }

    if(datumbis !== "undefined"){
      anhang += QUERY_SUCHE_DATUMBIS + "'" + datumbis + "'";
    }

    connection.query(sql + connection.escape('%'+ begriff + '%') + anhang,(err, result, _) => {
      if ( err ){
        console.log(err);
        res.json({error: 'Fehler beim Suchen'});
        return;
      }
      res.send(result);
    });
      
  }

});

// TODO BESCHREIBUNG HINZUFUEGEN
app.get('/api/kategoriesuche/:kid', function(req, res){
  const { kid } = req.params;

  connection.query(QUERY_SELECT_REZEPTE_ZU_KATEGORIE, [kid], function(err, data){
    if(err){
      res.status(400).send('Fehler in Datenbankoperation')
    } else {
      res.send(data);
    }
  });
});

 // TODO BESCHREIBUNG HINZUFUEGEN
 app.get('/api/suche/:suchbegriff', function(req, res){
  const { suchbegriff } = req.params;

  connection.query(QUERY_SELECT_SEARCH_REZEPTE + connection.escape('%'+ suchbegriff + '%'), function(err, data){
    if (err){
      res.status(400).send('Fehler in Datenbankoperation');
    } else {
      res.send(data);
    }
  });
 });


 // TODO BESCHREIBUNG HINZUFUEGEN
 app.get('/api/kategorienamen', function(req, res){
  connection.query(QUERY_SELECT_ALLE_KATEGORIEN, function(err, data){
    if (err){
      res.status(400).send('Fehler in Datenbankoperation');
    } else {
      res.send(data);
    }
  });
 });

// Loescht ein Rezept
// FUNKTIONIERT (ABER NOCH AUTH HINZUFUEGEN OB DER ZUGEHOERIGE BENUTZER EINGELOGGT IST! + KATEGORIEN ZUVOR LOESCHEN) 
app.delete('/api/deleterezept/:rid', function(req, res){
  const { rid } = req.params;
  var krids = [];
  var sql = ""; 

  // Schritt 1 Finden der KRID's
  connection.query(QUERY_SELECT_KRIDS_ZU_REZEPT,[rid], function(err, data){
    if (err){
      res.status(400).send('Fehler in Datenbankoperation');
      return;
    } else {

      // Wenn keine Kategorien vorhanden -> gleich loeschen
      if (data.length !== 0){
        data.forEach(function(i, idx, array){
          krids.push(array[idx].KRID)
        });

        // Schritt 2 sqlbefehl concat
        krids.forEach(function(i, idx, array){
          sql += i;

          if (idx !== array.length -1){
            sql += ",";
          } 
          if (idx === array.length -1){
            sql += ")"
          }
        });

        // Schritt 3 Loeschen der Eintraege
        connection.query(QUERY_DELETE_KATEGORIEZUREZEPT + sql, function(err, data){
          if (err){
            res.status(400).send('Fehler in Datenbankoperation');
            return;
          } else {
            console.log("KRID's geloescht")
          }
        });
      }

      // Schritt 4 Loeschen des Rezepts
      connection.query(QUERY_DELETE_REZEPT, [rid], (err, result, _) => {
        if (err){
          console.log(err);
          res.json({error: 'Fehler beim loeschen eines Rezepts'});
          return;
      }
        res.json({geloescht: true});
      });
    }
  });





  // Loeschen des Rezepts
  connection.query(QUERY_DELETE_REZEPT, [rid], (err, result, _) => {
    if (err){
      console.log(err);
      res.json({error: 'Fehler beim loeschen eines Rezepts'});
      return;
    }

    res.json({geloescht: true});
  });
});

// Updated ein Rezept
app.post('/api/updaterezept/:rid', function(req, res){
  const { rid } = req.params;

  const { rezept } = req.body;
  const { titel, beschreibung, bildpfad } = rezept;

  connection.query(QUERY_UPDATE_REZEPT, [titel, beschreibung, bildpfad, rid], (err, result, _) => {
    if (err){
      console.log(err);
      res.json({error: 'Fehler beim Update eines Rezeptes'});
      return;
    }

    res.json({update: true});
  });
});

// Fuegt einem Rezept eine neue Kategorie hinzu
app.post('/api/rezeptkategorien', function(req, res){
  const { rezeptkategorie } = req.body;
  const { kid, rid } = rezeptkategorie;

  connection.query(QUERY_INSERT_KATEGORIEN_ZU_REZEPT, [kid, rid],(err, result, _) => {
    if (err){
      console.log(err);
      res.json({error: 'Fehler beim hinzufuegen einer Kategorie zum Rezept'});
      return;
    }
    
    res.json({hinzugefuegt: true});
  });
});

// Fuegt neues Rezept hinzu
// TODO es muss noch QUERY_INSERT_KATEGORIEN_ZU_REZEPT eingefuegt werden
/**
 * Beispiel JSON:
 * 
 * {
 *	"rezept": 
 *  {
 *	  "titel": "Test",
 *		"beschreibung": "Test",
 *		"bildpfad": "Test",
 *		"bid": 1
 *	}
 * }
 */
app.post('/api/rezept', function(req, res){
  const { rezept } = req.body;
  const { titel, beschreibung, bildpfad, bid } = rezept;

  connection.query(QUERY_INSERT_REZEPT,[titel, beschreibung, bildpfad, bid],(err, result, _) => {
    if ( err ){
      console.log(err);
      res.json({error: 'Fehler beim Anlegen eines neuen Rezepts'});
      return;
    }

    res.json({hinzugefuegt: true});
  });

});

// Laedt ein einzelnes Rezept
app.get('/api/rezept/:rid', function(req, res){
  const { rid } = req.params;

  connection.query(QUERY_SELECT_REZEPT,[rid], function(err, data){
    if (err){
      res.status(400).send('Fehler in Datenbankoperation');
    } else {
      res.send(data);
    }
  });
});

// Laedt alle Rezepte aus der Datenbank fuer die Startseite
app.get('/api/rezeptuebersicht', function(req, res){
  connection.query(QUERY_SELECT_REZEPTUEBERSICHT, function(err, data){

    if (err){
      res.status(400).send('Fehler in Datenbankoperation');
    } else {
      res.send(data);
    }
  });
});

// Laedt alle Kategorienamen eines Rezepts mit der RID
app.get('/api/rezeptkategorien/:rid', function(req, res){
  const { rid } = req.params;

  connection.query(QUERY_SELECT_KATEGORIEN_ZU_REZEPT,[rid], function(err, data){

    if (err){
      res.status(400).send('Fehler in Datenbankoperation');
    } else {
      res.send(data);
    }
  });
});

// NICHT VERAENDERN
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);