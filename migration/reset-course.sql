-- Command to delete courses
DELETE FROM course_unit_module_chunks;
DELETE FROM course_unit_modules;
DELETE FROM course_units;
DELETE FROM courses;

-- Command to reset serial sequence
SELECT setval('courses_id_seq', 1, false);
SELECT setval('course_units_id_seq', 1, false);
SELECT setval('course_unit_modules_id_seq', 1, false);
SELECT setval('course_unit_module_chunks_id_seq', 1, false);