//3. crear el modelo o esquema task
import { Schema, model, models } from "mongoose";

const tasksSchema = new Schema({
    title: {
        type: String,
        require: [true, 'Title is required'], //hacer ciertos campos obligatorios, y retorna un mensaje
        unique: true,
        trim: true, //quita los espacios
        maxlength: [40, 'Title must be less than 40 charactters'] //maximo de caracteres permitidos
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Title must be less than 200 charactters']
    },
    isMade: {
        type: Boolean,  // Campo booleano para indicar si la tarea está hecha
        default: false,  // Valor por defecto es `false`
    },
    dateAsigned: {
        type: String,  // Campo de tipo Date para almacenar la fecha y hora
        required: true,  // Campo obligatorio
    },
    priority: {
        type: String,  
        required: true, 
    },


}, {
    timestamps: true, //fechas, creacion y actuaizacion
    versionKey: false
});

export default models.Task || model('Task', tasksSchema);

