DROP TABLE IF EXISTS
attendance,
payments,
expenses,
enquiries,
members,
packages,
subscriptions,
gyms,
plans,
superadmins
CASCADE;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE superadmins (
    id SERIAL PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(200) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    mobile VARCHAR(20),

    profile_image TEXT,

    status BOOLEAN DEFAULT TRUE,

    last_login TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plans (

    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    description TEXT,

    price DECIMAL(10,2) NOT NULL,

    duration_months INTEGER NOT NULL,

    max_members INTEGER,

    max_trainers INTEGER,

    max_branches INTEGER DEFAULT 1,

    can_use_attendance BOOLEAN DEFAULT TRUE,

    can_use_reports BOOLEAN DEFAULT TRUE,

    can_use_whatsapp BOOLEAN DEFAULT FALSE,

    can_use_sms BOOLEAN DEFAULT FALSE,

    can_use_expense BOOLEAN DEFAULT TRUE,

    status BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
CREATE TABLE gyms (

    id SERIAL PRIMARY KEY,

    gym_name VARCHAR(200) NOT NULL,

    owner_name VARCHAR(150) NOT NULL,

    email VARCHAR(200) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    phone VARCHAR(20),

    alternate_phone VARCHAR(20),

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    country VARCHAR(100),

    pincode VARCHAR(20),

    logo TEXT,

    gst_number VARCHAR(50),

    status BOOLEAN DEFAULT TRUE,

    created_by INTEGER REFERENCES superadmins(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);CREATE TABLE subscriptions (

    id SERIAL PRIMARY KEY,

    gym_id INTEGER NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,

    plan_id INTEGER NOT NULL REFERENCES plans(id),

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    amount DECIMAL(10,2) NOT NULL,

    payment_status VARCHAR(30) DEFAULT 'Paid',

    status VARCHAR(30) DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);CREATE TABLE members (

    id SERIAL PRIMARY KEY,

    gym_id INTEGER NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,

    member_code VARCHAR(50),

    full_name VARCHAR(150) NOT NULL,

    gender VARCHAR(20),

    dob DATE,

    phone VARCHAR(20),

    email VARCHAR(200),

    address TEXT,

    weight DECIMAL(5,2),

    height DECIMAL(5,2),

    join_date DATE,

    photo TEXT,

    status BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);CREATE TABLE packages (

    id SERIAL PRIMARY KEY,

    gym_id INTEGER REFERENCES gyms(id) ON DELETE CASCADE,

    package_name VARCHAR(150) NOT NULL,

    duration_months INTEGER,

    price DECIMAL(10,2),

    description TEXT,

    status BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);CREATE TABLE payments (

    id SERIAL PRIMARY KEY,

    gym_id INTEGER REFERENCES gyms(id) ON DELETE CASCADE,

    member_id INTEGER REFERENCES members(id) ON DELETE CASCADE,

    package_id INTEGER REFERENCES packages(id),

    amount DECIMAL(10,2),

    payment_date DATE,

    payment_method VARCHAR(50),

    transaction_id VARCHAR(100),

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);CREATE TABLE attendance (

    id SERIAL PRIMARY KEY,

    gym_id INTEGER REFERENCES gyms(id) ON DELETE CASCADE,

    member_id INTEGER REFERENCES members(id) ON DELETE CASCADE,

    attendance_date DATE,

    check_in TIME,

    check_out TIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);CREATE TABLE trainers (

    id SERIAL PRIMARY KEY,

    gym_id INTEGER REFERENCES gyms(id) ON DELETE CASCADE,

    full_name VARCHAR(150),

    phone VARCHAR(20),

    email VARCHAR(200),

    salary DECIMAL(10,2),

    joining_date DATE,

    specialization VARCHAR(100),

    photo TEXT,

    status BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);CREATE TABLE enquiries (

    id SERIAL PRIMARY KEY,

    gym_id INTEGER REFERENCES gyms(id) ON DELETE CASCADE,

    full_name VARCHAR(150),

    phone VARCHAR(20),

    email VARCHAR(200),

    source VARCHAR(100),

    interested_package VARCHAR(100),

    remarks TEXT,

    followup_date DATE,

    status VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);CREATE TABLE expenses (

    id SERIAL PRIMARY KEY,

    gym_id INTEGER REFERENCES gyms(id) ON DELETE CASCADE,

    title VARCHAR(150),

    amount DECIMAL(10,2),

    expense_date DATE,

    category VARCHAR(100),

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
