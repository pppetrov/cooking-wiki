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
       text_content BLOB
);

CREATE TABLE revs(
       rev_id INTEGER PRIMARY KEY AUTOINCREMENT,
       rev_page_id INTEGER,
       rev_text_id INTEGER,
       rev_comment TEXT,
       rev_timestamp TEXT,
       FOREIGN KEY (rev_page_id) REFERENCES page(page_id),
       FOREIGN KEY (rev_text_id) REFERENCES text(text_id)
);

