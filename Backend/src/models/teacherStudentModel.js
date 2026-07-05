const pool = require("../config/db");

const getTeacherStudents = async () => {

    const result = await pool.query(`
    
        SELECT

            u.id,

            u.name,

            u.email,

            COUNT(DISTINCT e.course_id) AS enrolled_courses,

            COUNT(DISTINCT CASE
                WHEN p.completed = true
                THEN p.lesson_id
            END) AS completed_lessons,

            COUNT(DISTINCT qa.id) AS quiz_attempts,

            COALESCE(
                ROUND(AVG(
                    (qa.score::decimal / NULLIF(qa.total_questions,0))*100
                ),2),
                0
            ) AS average_score

        FROM users u

        LEFT JOIN enrollments e
            ON u.id=e.user_id

        LEFT JOIN progress p
            ON u.id=p.user_id

        LEFT JOIN quiz_attempts qa
            ON u.id=qa.user_id

        WHERE u.role='student'

        GROUP BY
            u.id,
            u.name,
            u.email

        ORDER BY
            u.name ASC

    `);

    return result.rows;

};

module.exports={
    getTeacherStudents
};