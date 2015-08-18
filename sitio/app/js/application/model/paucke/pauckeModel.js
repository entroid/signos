define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var Paucke = Backbone.Model.extend({
        defaults: {
        },
        initialize: function(){
            console.log("enetring paucke model");
        }
    });

    var paucke = new Paucke({ 
        1: {
            tit: 'Mi traves&iacute;a por el saladillo'
            img: 'mi-travesia-por-el-saladillo.jpg', 
            frag: '<p>Yo fui el primero e igualmente por primera vez fui transportado a trav&eacute;s del r&iacute;o sobre una embarcaci&oacute;n india y siempre usada por los indios. El barco o veh&iacute;culo consist&iacute;a en un cuero crudo resecado que fue atado en las cuatro puntas de modo que los costados ten&iacute;an la altura de un jeme. Mis indios tiraron ah&iacute; adentro mis cosas del recado y todo lo que yo llevaba sobre el caballo; al final, yo tambi&eacute;n tuve que sentarme ah&iacute; adentro. Los indios me arrastraron en esta posici&oacute;n hasta la orilla de dicho r&iacute;o, me llevaron m&aacute;s adentro del agua y probaron el equilibrio, que en esta navegaci&oacute;n es menester mantener para que esta barca de cuero no se incline m&aacute;s a un lado que al otro, si no era de temer el hundimiento del barco y de los navegantes. Cuando todo estuvo equilibrado y yo estaba sentado cual un muro sobre el cuero, un indio at&oacute; en &eacute;ste una corre&iacute;ta, se ech&oacute; desnudo al agua, tom&oacute; entre los dientes esta corre&iacute;ta, nad&oacute; a trav&eacute;s del r&iacute;o y arrastr&oacute; tras de s&iacute; mi barco de cuero junto conmigo.</p>',
            trad: 'De qu&eacute; modo el misionero sobre un cuero pasa el r&iacute;o. Otra manera en cesta de viaje. De qu&eacute; modo se pasan en Paracuaria los carros por r&iacute;os hondos.'
        },
        2: {
            tit: 'Se hacen tatuar la cara para ser bellos'
            img: 'se-hacen-tatuar-la-cara-para-ser-bellos.jpg', 
            frag: '<p>Como el sexo femenino europeo es tan ansioso por todas las modas y s&oacute;lo trata siempre de llevar sobre s&iacute; nuevos y ex&oacute;ticos vestidos de gala y aprecia en lo m&aacute;s a aquella moda que proviene de tierras lejanas, podr&iacute;a tambi&eacute;n complacerse con aquella moda que procede de algunos miles de leguas. Ahora yo preguntar&iacute;a qu&eacute; diferencia habr&iacute;a entre una locuela por las modas europeas y una india americana. Yo digo: ninguna, porque ambas son fantaseadoras y quieren ser bellas mediante la fealdad.</p>',
            trad: 'Arriba a la izquierda: India tatuada en la cara y en el pecho con sus l&oacute;bulos horadados sin pendientes. Arriba a la derecha: Otra india con sus pendientes. Indio con tatuaje en la cara. En el centro: Figuras tatuadas sobre el pecho. Abajo a la izquierda: Espina para tatuar. Abajo a la derecha: Tatuadora de im&aacute;genes paracuaria.'
        }
    });

    return paucke;

});