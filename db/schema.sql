DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS namespaces;
DROP TABLE IF EXISTS revs;
DROP TABLE IF EXISTS texts;

CREATE TABLE namespaces(
       namespace_id INTEGER PRIMARY KEY AUTOINCREMENT,
       namespace_name TEXT
);

CREATE TABLE pages(
       page_id INTEGER PRIMARY KEY AUTOINCREMENT,
       page_namespace_id INTEGER,
       page_title TEXT,
       FOREIGN KEY (page_namespace_id) REFERENCES namespace(namespace_id)
);

CREATE TABLE texts(
       text_id INTEGER PRIMARY KEY AUTOINCREMENT,
       text_markdown BLOB,
       text_html BLOB
);

CREATE TABLE revs(
       rev_id INTEGER PRIMARY KEY AUTOINCREMENT,
       rev_page_id INTEGER,
       rev_text_id INTEGER,
       rev_comment TEXT,
       rev_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (rev_page_id) REFERENCES page(page_id),
       FOREIGN KEY (rev_text_id) REFERENCES text(text_id)
);


/*SELECT text_html, max(rev_timestamp) FROM (SELECT texts.text_html, revs.rev_timestamp FROM pages INNER JOIN revs ON pages.page_id=revs.rev_page_id INNER JOIN texts ON revs.rev_text_id=texts.text_id WHERE pages.page_id=3);*/

