/*
 * File: app/view/ui/Surface.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Designer does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.ui.Surface', {
    extend: 'Ext.Panel',
    requires: [
        'MyApp.view.Ball',
        'MyApp.view.Paddle'
    ],

    config: {
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                height: 75,
                title: 'Pong',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'playpause',
                        ui: 'confirm',
                        text: 'Play / Pause'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'sliderfield',
                        itemId: 'mysliderfield',
                        width: 300,
                        label: 'Difficulty',
                        labelWidth: 100,
                        value: [
                            1
                        ],
                        maxValue: 10,
                        minValue: 1
                    }
                ]
            },
            {
                xtype: 'ball',
                itemId: 'ball'
            },
            {
                xtype: 'paddle',
                draggable: true,
                itemId: 'player',
                right: 100
            },
            {
                xtype: 'paddle',
                itemId: 'cpu',
                left: 100
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'component',
                        cls: [
                            'score'
                        ],
                        html: 'CPU: 0',
                        itemId: 'scoreCPU'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'component',
                        cls: [
                            'score'
                        ],
                        html: 'Player: 0',
                        itemId: 'scorePlayer'
                    }
                ]
            }
        ]
    }

});