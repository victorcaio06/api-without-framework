ALTER TABLE USERS
ADD PASSWORD VARCHAR(50) CHECK(LENGTH(PASSWORD) >= 8)