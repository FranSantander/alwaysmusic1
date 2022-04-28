const { Client } = require("pg");
const argumentos = process.argv.slice(2);
const funcion = argumentos[0];
//console.log(argumentos)

const config = {
  user: "postgres",
  host: "localhost",
  database: "alwaysmusic",
  password: "postgresql",
  port: "5432",
};

const client = new Client(config);

client.connect();

//Requerimiento 1
async function registrar(nombre, rut, curso, nivel) {
  const res = await client.query(
    `insert into estudiante (nombre,rut, curso, nivel ) values ('${nombre}', '${rut}','${curso}','${nivel}')`
  );
  console.log(`Estudiante ${nombre} agregado con éxito`)
}
//Requerimiento 2
async function consultaRut(rut) {
  const res = await client.query(`select * from estudiante where rut='${rut}'`);
  console.log(res.rows);
}
//Requerimiento 3
async function consultaTodos() {
  const res = await client.query("select * from estudiante");
  console.log('Registro actual', res.rows);
}
//Requerimiento 4
async function actualizar(nombre,rut,curso,nivel) {
  const res = await client.query(
    `UPDATE estudiante SET nombre= '${nombre}', curso= '${curso}',  nivel= '${nivel} WHERE rut ='${rut}'`
  );
  console.log(`Estudiante ${nombre} editado con éxito`)
}
//Requerimiento 5
async function eliminar(rut) {
  const res = await client.query(`DELETE FROM estudiante where rut='${rut}'`);
  console.log(`Registro de estudiante con rut:${rut} eliminado`)
}
//registrar(nombre,rut,curso,nivel);


if(funcion == 'registrar'){
    const nombre = argumentos[1];
    const rut = argumentos[2];
    const curso = argumentos[3];
    const nivel = argumentos[4];
    registrar(nombre,rut,curso,nivel).then(()=>client.end())
}if(funcion == 'rut'){
    const rut = argumentos[1];
    consultaRut(rut).then(()=>client.end())
}if(funcion == 'consulta'){
    consultaTodos().then(()=>client.end())
}if(funcion == 'editar'){
    const nombre = argumentos[1];
    const rut = argumentos[2];
    const curso = argumentos[3];
    const nivel = argumentos[4];
    actualizar(nombre,rut,curso,nivel).then(()=>client.end())
}if(funcion == 'eliminar'){
    const rut = argumentos[1]
    eliminar(rut).then(()=>client.end())

}

