--criando permissões para o usuário do dms
GRANT SELECT ON ALUNOS TO DMS_USER;
GRANT SELECT ON professores TO dms_user;
GRANT SELECT ON disciplinas TO dms_user;
GRANT SELECT ON notas TO dms_user;
COMMIT;